import { useQuery, gql } from '@apollo/client';
import ApolloClient from 'apollo-boost';
import {
	CardContent,
	Typography,
	CircularProgress,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Grid,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import MuiAlert from '@material-ui/lab/Alert';

const client = new ApolloClient({
	uri: 'http://192.168.1.121:4000/graphql',
});

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function SubredditsComments(props) {
	const { id, topic, token } = props;

	const GET_SUBREDDITS_COMMENTS = gql`
		{
			getComments(topic: "${topic}", id: "${id}", limit: 3, token: "${token}") {
				body
				id
			}
		}
	`;
	const { loading, error, data } = useQuery(GET_SUBREDDITS_COMMENTS, {
		client,
		onCompleted: (data) => {},
	});

	if (loading) return <CircularProgress className={'subredditscontainer'} />;
	if (error) {
		return <Alert severity="error">{error.message}</Alert>;
	}
	return data && data.getComments.length > 0 ? (
		data.getComments.map(({ body, id }) => (
			<Grid item xs={12} key={id}>
				<CardContent>
					<Accordion id={id} className={'subredditscontainer'}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls={`panel1a-content-${id}`}
							id={`panel1a-header-${id}`}
						>
							<Typography variant="h5" component="h2">
								{body}
							</Typography>
							{/* <CardActions>
					<Button size="small">Learn More</Button>
				</CardActions> */}
						</AccordionSummary>
					</Accordion>
				</CardContent>
			</Grid>
		))
	) : (
		<div>
			<p>No results</p>
		</div>
	);
}

export function Subreddits(props) {
	const GET_SUBREDDITS = gql`
		{
			subreddits(topic: "${props.topic}", sort: "${props.sort}", limit: ${props.limit}, token: "${props.token}") {
				title
				id
				subreddit
			}
		}
	`;
	const { loading, error, data } = useQuery(GET_SUBREDDITS, {
		client,
		onCompleted: (data) => {},
	});
	const { token } = props;
	if (loading) return <CircularProgress className={'subredditscontainer'} />;
	if (error) {
		return <Alert severity="error">{error.message}</Alert>;
	}
	return data && data.subreddits.length > 0 ? (
		data.subreddits.map(({ title, subreddit, index, id }) => (
			<Accordion key={id} id={id} className={'subredditscontainer'}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id={`panel1a-header-${id}`}
				>
					<Typography variant="h5" component="h2">
						{title}
					</Typography>
					{/* <CardActions>
					<Button size="small">Learn More</Button>
				</CardActions> */}
				</AccordionSummary>
				<AccordionDetails>
					<Grid container>
						{subreddit && id && (
							<SubredditsComments
								token={token}
								topic={subreddit}
								id={id}
							/>
						)}
					</Grid>
				</AccordionDetails>
			</Accordion>
		))
	) : (
		<div>
			<p>No results</p>
		</div>
	);
}

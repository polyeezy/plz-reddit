import React from 'react';
import {
	Container,
	Input,
	FormControlLabel,
	Radio,
	InputLabel,
	FormControl,
	Select,
	MenuItem,
	Grid,
} from '@material-ui/core';
import { Subreddits } from '../graphql/queries';

export default class Welcome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			topic: 'popular',
			sortValues: ['hot', 'new'],
			limitValues: [25, 50, 75, 100],
			sort: 'hot',
			limit: 100,
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e, key) {
		this.setState({ [key]: e.target.value });
	}

	render() {
		const { topic, sort, limit, sortValues, limitValues } = this.state;

		return (
			<Container>
				<Grid container spacing={5}>
					<Grid item xs={4}>
						<FormControl>
							<InputLabel id="demo-simple-select-label">
								Subreddit
							</InputLabel>
							<Input
								value={topic}
								onChange={(e) => {
									this.handleChange(e, 'topic');
								}}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={4}>
						<div
							onChange={(e) => {
								this.handleChange(e, 'sort');
							}}
						>
							{sortValues.map((value, index) => {
								return (
									<FormControlLabel
										key={index}
										value={value}
										control={<Radio />}
										label={value}
										checked={value === sort}
									/>
								);
							})}
						</div>
					</Grid>
					<Grid item xs={4}>
						<FormControl>
							<InputLabel id="demo-simple-select-label">
								Items
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={limit}
								onChange={(e) => {
									this.handleChange(e, 'limit');
								}}
							>
								{limitValues.map((value, index) => {
									return (
										<MenuItem
											key={index}
											value={value}
											selected={limit === value}
										>
											{value}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					</Grid>
				</Grid>
				<Subreddits topic={topic} sort={sort} limit={limit} />
			</Container>
		);
	}
}

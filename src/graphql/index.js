import { GraphQLSchema, GraphQLObjectType } from 'graphql';

const PersonType = new GraphQLObjectType({
	/* ... */
	fields: () => ({
		/* ... */
		friends: {
			type: new GraphQLList(PersonType),
			resolve: (person) => person.friends.map(fetchPersonByURL),
		},
	}),
});

type User {
	accessToken: String,
	filters: Filters
 }

type Query {
	me: User
 }
  


 Type Page {
	start: String,
	end: String
 }

 type Filters {
	section: String,
	search: String,
	page: Page
 }


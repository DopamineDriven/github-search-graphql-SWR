# github-search-graphql-SWR

Utilizing @graphql-codegen/SWR with GraphQL Request + a Global SWR config to explore the pros and cons of replacing apollo with a more lightweight SWR

- Built using GitHub Explorer -- Fragmenting complex queries down 

```graphql
fragment GitHubUserOrgsFields on Organization {
	id
	url
	email
	location
	name
	avatarUrl
}

fragment GitHubIssueFields on Issue {
	id
	url
	bodyUrl
	number
	title
	body
	bodyText
	bodyHTML
	createdAt
	updatedAt
	author {
		url
		login
		avatarUrl(size: 250)
	}
}

fragment GitHubPinnableItem on PinnableItem {
	... on Repository {
		id
		description
		stargazerCount
		nameWithOwner
		name
		name
		primaryLanguage {
			color
			name
			id
		}
		forkCount
	}
}

fragment GitHubUserStatus on UserStatus {
	message
	expiresAt
	id
	emoji
	createdAt
}

fragment GitHubPageInfo on PageInfo {
	hasNextPage
	hasPreviousPage
	endCursor
	startCursor
}

fragment GitHubUserFields on User {
	id
	bio
	twitterUsername
	login
	location
	email
	company
	createdAt
	name
	isViewer
	hovercard {
		contexts {
			octicon
			message
			... on GenericHovercardContext {
				__typename
				message
				octicon
			}
		}
	}
	anyPinnableItems(type: REPOSITORY)
	avatarUrl(size: 250)
	starredRepositories {
		totalCount
	}
	followers {
		totalCount
	}
	following {
		totalCount
	}
	organizations(first: 5) {
		totalCount
		pageInfo {
			...GitHubPageInfo
		}
		nodes {
			...GitHubUserOrgsFields
		}
	}
	status {
		...GitHubUserStatus
	}
	pinnedItems(first: 6, types: REPOSITORY) {
		totalCount
		pageInfo {
			...GitHubPageInfo
		}
		nodes {
			...GitHubPinnableItem
		}
	}
}

fragment RepoPartial on Repository {
	name
	stargazerCount
	forkCount
	id
	owner {
		id
		login
	}
	url
	nameWithOwner
	description
	name
	isFork
	isPrivate
	isArchived
	createdAt
	updatedAt
	homepageUrl
	stargazerCount
	forkCount
	openGraphImageUrl
	isArchived
	isInOrganization
	primaryLanguage {
		name
		color
		id
	}
}

fragment GitHubLabelFields on Label {
	name
	color
	description
	id
}

fragment CommitCommentPartial on CommitComment {
	body
	bodyText
	bodyHTML
	id
	authorAssociation
	bodyText
	createdAt
	author {
		avatarUrl(size: 250)
		url
		login
	}
}

fragment GitHubReactablePartial on Reactable {
	reactionGroups {
		content
		viewerHasReacted
		users {
			pageInfo {
				...GitHubPageInfo
			}
			totalCount
			nodes {
				name
				login
				id
			}
		}
	}
}

fragment GitHubReactionsPartial on ReactionConnection {
	totalCount
	pageInfo {
		...GitHubPageInfo
	}
	edges {
		cursor
		node {
			content
			id
			reactable {
				...GitHubReactablePartial
			}
			user {
				id
				name
				login
			}
		}
	}
}

fragment GitHubLanguagesPartial on LanguageConnection {
	totalSize
	totalCount
	pageInfo {
		...GitHubPageInfo
	}
	edges {
		cursor
		size
		node {
			color
			name
			id
		}
	}
}

fragment GitHubIssueCommentFields on IssueComment {
	bodyText
	author {
		avatarUrl(size: 250)
		login
		url
	}
	createdAt
	updatedAt
	reactionGroups {
		content
		viewerHasReacted
	}
	reactions(first: 100) {
		...GitHubReactionsPartial
	}
}

query getRepoByLoginWithFrags(
	$login: String!
	$name: String!
) {
	user(login: $login) {
		...GitHubUserFields
		repository(name: $name) {
			...RepoPartial
			commitComments(first: 3) {
				pageInfo {
					...GitHubPageInfo
				}
				nodes {
					...CommitCommentPartial
				}
			}
			languages(first: 10) {
				...GitHubLanguagesPartial
			}
			labels(
				first: 10
				orderBy: { field: NAME, direction: DESC }
			) {
				pageInfo {
					...GitHubPageInfo
				}
				totalCount
				nodes {
					...GitHubLabelFields
				}
			}
			issues(
				first: 10
				states: [OPEN]
				orderBy: { field: UPDATED_AT, direction: DESC }
			) {
				totalCount
				pageInfo {
					...GitHubPageInfo
				}
				nodes {
					...GitHubIssueFields
					reactions(first: 10) {
						...GitHubReactionsPartial
					}
					comments(
						first: 10
						orderBy: { field: UPDATED_AT, direction: DESC }
					) {
						totalCount
						pageInfo {
							...GitHubPageInfo
						}
						edges {
							cursor
							node {
								...GitHubIssueCommentFields
							}
						}
					}
				}
			}
		}
	}
}
```

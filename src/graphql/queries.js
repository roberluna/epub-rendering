/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEpub = /* GraphQL */ `
  query GetEpub($id: ID!) {
    getEpub(id: $id) {
      id
      title
      description
      file
      username
      createdAt
      updatedAt
    }
  }
`;
export const listEpubs = /* GraphQL */ `
  query ListEpubs(
    $filter: ModelEpubFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEpubs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        file
        username
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const epubsByUserName = /* GraphQL */ `
  query EpubsByUserName(
    $username: String!
    $sortDirection: ModelSortDirection
    $filter: ModelEpubFilterInput
    $limit: Int
    $nextToken: String
  ) {
    epubsByUserName(
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        description
        file
        username
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

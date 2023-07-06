/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEpub = /* GraphQL */ `
  subscription OnCreateEpub(
    $filter: ModelSubscriptionEpubFilterInput
    $username: String
  ) {
    onCreateEpub(filter: $filter, username: $username) {
      id
      title
      description
      username
      file
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateEpub = /* GraphQL */ `
  subscription OnUpdateEpub(
    $filter: ModelSubscriptionEpubFilterInput
    $username: String
  ) {
    onUpdateEpub(filter: $filter, username: $username) {
      id
      title
      description
      username
      file
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteEpub = /* GraphQL */ `
  subscription OnDeleteEpub(
    $filter: ModelSubscriptionEpubFilterInput
    $username: String
  ) {
    onDeleteEpub(filter: $filter, username: $username) {
      id
      title
      description
      username
      file
      createdAt
      updatedAt
    }
  }
`;

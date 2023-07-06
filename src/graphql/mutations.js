/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEpub = /* GraphQL */ `
  mutation CreateEpub(
    $input: CreateEpubInput!
    $condition: ModelEpubConditionInput
  ) {
    createEpub(input: $input, condition: $condition) {
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
export const updateEpub = /* GraphQL */ `
  mutation UpdateEpub(
    $input: UpdateEpubInput!
    $condition: ModelEpubConditionInput
  ) {
    updateEpub(input: $input, condition: $condition) {
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
export const deleteEpub = /* GraphQL */ `
  mutation DeleteEpub(
    $input: DeleteEpubInput!
    $condition: ModelEpubConditionInput
  ) {
    deleteEpub(input: $input, condition: $condition) {
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

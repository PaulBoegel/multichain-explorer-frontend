import { gql } from "@apollo/client";

export const BLOCKS = gql`
  query blocks($chainId: Int, $height: Int, $pageSize: Int, $page: Int) {
    blocks(
      chainId: $chainId
      height: $height
      pageSize: $pageSize
      page: $page
    ) {
      size
      blocks {
        hash
        height
        mined
        parent
        tx {
          txid
          from {
            address
            value
            coinbase
          }
          to {
            address
            value
            coinbase
          }
        }
      }
    }
  }
`;

export const TRANSACTIONS = gql`
  query transactions($chainId: Int, $txid: String, $pageSize: Int, $page: Int) {
    transactions(
      chainId: $chainId
      txid: $txid
      pageSize: $pageSize
      page: $page
    ) {
      size
      blocks {
        hash
        height
        mined
        parent
        tx {
          txid
          from {
            address
            value
            coinbase
          }
          to {
            address
            value
            coinbase
          }
        }
      }
    }
  }
`;

export const ADDRESS = gql`
  query address($chainId: Int, $address: String, $pageSize: Int, $page: Int) {
    address(
      chainId: $chainId
      address: $address
      pageSize: $pageSize
      page: $page
    ) {
      size
      blocks {
        hash
        height
        mined
        parent
        tx {
          txid
          from {
            address
            value
            coinbase
          }
          to {
            address
            value
            coinbase
          }
        }
      }
    }
  }
`;

export const SEARCH = gql`
  query searchEntity($chainId: Int, $searchString: String) {
    searchEntity(chainId: $chainId, searchString: $searchString)
  }
`;

export const GetEntityQuery = (chainId, searchState) => {
  switch (searchState.id) {
    case 1:
      return {
        query: TRANSACTIONS,
        variables: {
          chainId: chainId,
          txid: searchState.value,
          pageSize: 100,
          page: 0,
        },
      };
    case 2:
      return {
        query: ADDRESS,
        variables: {
          chainId: chainId,
          address: searchState.value,
          pageSize: 1000,
          page: 0,
        },
      };
    default:
      return {
        query: BLOCKS,
        variables: {
          chainId: chainId,
          height: searchState.value,
          pageSize: 10000,
          page: 0,
        },
      };
  }
};

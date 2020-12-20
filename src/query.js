import { gql } from "@apollo/client";

export const BLOCKS = gql`
  query blocks($chainId: Int, $height: Int, $pageSize: Int, $page: Int) {
    blocks(
      chainId: $chainId
      height: $height
      pageSize: $pageSize
      page: $page
    ) {
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
`;

export const TRANSACTIONS = gql`
  query transactions($chainId: Int, $txid: String, $pageSize: Int, $page: Int) {
    transactions(
      chainId: $chainId
      txid: $txid
      pageSize: $pageSize
      page: $page
    ) {
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
`;

export const ADDRESS = gql`
  query address($chainId: Int, $address: String, $pageSize: Int, $page: Int) {
    address(
      chainId: $chainId
      address: $address
      pageSize: $pageSize
      page: $page
    ) {
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
`;

export const SEARCH = gql`
  query searchEntity($chainId: Int, $searchString: String) {
    searchEntity(chainId: $chainId, searchString: $searchString)
  }
`;

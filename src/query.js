import { gql } from "@apollo/client";

export const BLOCKS = gql`
  query blocks($chainId: Int, $height: Int) {
    blocks(chainId: $chainId, height: $height) {
      hash
      height
      mined
      parent
      tx {
        txid
        from {
          address
          value
        }
        to {
          address
          value
        }
      }
    }
  }
`;

export const TRANSACTIONS = gql`
  query transactions($chainId: Int, $txid: String) {
    transactions(chainId: $chainId, txid: $txid) {
      hash
      height
      mined
      parent
      tx {
        txid
        from {
          address
          value
        }
        to {
          address
          value
        }
      }
    }
  }
`;

export const ADDRESS = gql`
  query address($chainId: Int, $address: String) {
    address(chainId: $chainId, address: $address) {
      hash
      height
      mined
      parent
      tx {
        txid
        from {
          address
          value
        }
        to {
          address
          value
        }
      }
    }
  }
`;
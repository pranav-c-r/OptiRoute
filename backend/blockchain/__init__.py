import os
import json
from web3 import Web3
from dotenv import load_dotenv
import time

load_dotenv()

class BlockchainHandler:
    def __init__(self):
        # Initialize Web3 connection to Polygon Amoy Testnet
        # RPC URL: `https://polygon-amoy.publicnode.com` is correct
        self.w3 = Web3(Web3.HTTPProvider('https://polygon-amoy.publicnode.com'))
        
        if not self.w3.is_connected():
            raise ConnectionError("Failed to connect to blockchain network")
        
        self.contract_address = os.getenv('CONTRACT_ADDRESS')
        self.admin_address = os.getenv('ADMIN_WALLET_ADDRESS')
        self.private_key = os.getenv('ADMIN_PRIVATE_KEY')
        
        # Validate environment variables
        if not all([self.contract_address, self.admin_address, self.private_key]):
            raise ValueError("Missing blockchain environment variables")
        
        # Load contract ABI
        try:
            script_dir = os.path.dirname(os.path.abspath(__file__))
            abi_path = os.path.join(script_dir, 'contract_abi.json')

            with open(abi_path, 'r') as f:
                self.contract_abi = json.load(f)
        except FileNotFoundError:
            # Fallback ABI if file doesn't exist yet
            self.contract_abi = [
                {
                    "inputs": [],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "anonymous": False,
                    "inputs": [
                        {
                            "indexed": True,
                            "internalType": "string",
                            "name": "applicantId",
                            "type": "string"
                        },
                        {
                            "indexed": False,
                            "internalType": "uint256",
                            "name": "vulnerabilityScore",
                            "type": "uint256"
                        },
                        {
                            "indexed": False,
                            "internalType": "string",
                            "name": "shelterUnitId",
                            "type": "string"
                        },
                        {
                            "indexed": False,
                            "internalType": "uint256",
                            "name": "timestamp",
                            "type": "uint256"
                        }
                    ],
                    "name": "AllocationRecorded",
                    "type": "event"
                },
                {
                    "inputs": [],
                    "name": "allocationCount",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "admin",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_applicantId",
                            "type": "string"
                        }
                    ],
                    "name": "getAllocation",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getAllocationCount",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_applicantId",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_vulnerabilityScore",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "_shelterUnitId",
                            "type": "string"
                        }
                    ],
                    "name": "recordAllocation",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ]
        
        # Initialize contract
        self.contract = self.w3.eth.contract(
            address=self.contract_address,
            abi=self.contract_abi
        )

        print("✅ Blockchain handler initialized successfully")
        print(f"   Network: {'Connected' if self.w3.is_connected() else 'Disconnected'}")
        print(f"   Contract Address: {self.contract_address}")
        print(f"   Admin Address: {self.admin_address}")
    
    def record_allocation(self, applicant_id, vulnerability_score, shelter_unit_id):
        """
        Record a shelter allocation on the blockchain
        Returns: {success: bool, transaction_hash: str, verification_url: str, error: str}
        """
        try:
            # Convert score to integer (multiply by 100 to preserve 2 decimal places)
            score_int = int(round(vulnerability_score * 100))
            
            # Build transaction
            transaction = self.contract.functions.recordAllocation(
                applicant_id,
                score_int,
                shelter_unit_id
            ).build_transaction({
                'chainId': 80002,  # CORRECT: Amoy Testnet chain ID
                'gas': 250000,     # Increased gas limit for string operations
                'gasPrice': self.w3.to_wei('35', 'gwei'),  # Slightly higher gas price
                'nonce': self.w3.eth.get_transaction_count(self.admin_address),
            })
            
            # Sign transaction
            signed_txn = self.w3.eth.account.sign_transaction(transaction, self.private_key)
            
            # Send transaction
            txn_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
            txn_hash_hex = txn_hash.hex()
            
            # Wait for transaction receipt (with timeout)
            start_time = time.time()
            timeout = 120  # 2 minutes timeout
            
            while time.time() - start_time < timeout:
                try:
                    receipt = self.w3.eth.getTransactionReceipt(txn_hash)
                    if receipt is not None:
                        break
                except:
                    pass
                time.sleep(3)  # Wait 3 seconds between checks
            
            if receipt is None:
                return {
                    'success': False,
                    'error': 'Transaction confirmation timeout',
                    'transaction_hash': txn_hash_hex
                }
            
            # Check if transaction was successful
            if receipt.status == 1:
                return {
                    'success': True,
                    'transaction_hash': txn_hash_hex,
                    'block_number': receipt['blockNumber'],
                    'gas_used': receipt['gasUsed'],
                    'verification_url': f'https://www.oklink.com/amoy/tx/{txn_hash_hex}' # CORRECT: Amoy block explorer URL
                }
            else:
                return {
                    'success': False,
                    'error': 'Transaction failed on blockchain',
                    'transaction_hash': txn_hash_hex
                }
            
        except Exception as e:
            return {
                'success': False,
                'error': f"Blockchain error: {str(e)}"
            }
    
    def get_allocation(self, applicant_id):
        """
        Retrieve allocation data from blockchain
        """
        try:
            result = self.contract.functions.getAllocation(applicant_id).call()
            
            return {
                'success': True,
                'data': {
                    'applicant_id': result[0],
                    'vulnerability_score': float(result[1]) / 100.0,  # Convert back to float
                    'shelter_unit_id': result[2],
                    'timestamp': result[3],
                    'is_approved': result[4]
                }
            }
        except Exception as e:
            return {
                'success': False,
                'error': f"Failed to get allocation: {str(e)}"
            }
    
    def get_allocation_count(self):
        """
        Get total number of allocations recorded
        """
        try:
            count = self.contract.functions.getAllocationCount().call()
            return {
                'success': True,
                'count': count
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def get_network_info(self):
        """
        Get blockchain network information
        """
        try:
            return {
                'success': True,
                'network_connected': self.w3.is_connected(),
                'latest_block': self.w3.eth.block_number,
                'chain_id': self.w3.eth.chain_id,
                'admin_balance': self.w3.eth.getBalance(self.admin_address)
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }

# Create global instance
try:
    blockchain_handler = BlockchainHandler()
except Exception as e:
    print(f"⚠️  Blockchain initialization failed: {e}")
    print("⚠️  Running in offline mode - blockchain features disabled")
    
    # Create dummy handler for offline development
    class DummyBlockchainHandler:
        def record_allocation(self, *args, **kwargs):
            return {
                'success': True, 
                'transaction_hash': '0x' + '0' * 64,
                'verification_url': 'https://example.com',
                'blockchain_disabled': True
            }
        def get_allocation(self, *args, **kwargs):
            return {'success': False, 'error': 'Blockchain disabled'}
        def get_allocation_count(self):
            return {'success': True, 'count': 0}
        def get_network_info(self):
            return {'success': False, 'error': 'Blockchain disabled'}
    
    blockchain_handler = DummyBlockchainHandler()
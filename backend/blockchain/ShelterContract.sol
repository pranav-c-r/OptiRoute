// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ShelterAllocation {
    // Structure to store allocation data
    struct Allocation {
        string applicantId;
        uint256 vulnerabilityScore;
        string shelterUnitId;
        uint256 timestamp;
        bool isApproved;
    }
    
    // Public variables
    address public admin;
    uint256 public allocationCount;
    uint256 public totalVulnerabilityScore;
    
    // Mappings
    mapping(string => Allocation) public allocations;
    mapping(address => bool) public authorizedWorkers;
    
    // Events
    event AllocationRecorded(
        string indexed applicantId,
        uint256 vulnerabilityScore,
        string shelterUnitId,
        uint256 timestamp,
        address recordedBy
    );
    
    event WorkerAuthorized(address worker, bool authorized);
    event AdminChanged(address oldAdmin, address newAdmin);
    
    // Modifiers
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }
    
    modifier onlyAuthorized() {
        require(
            msg.sender == admin || authorizedWorkers[msg.sender],
            "Not authorized"
        );
        _;
    }
    
    // Constructor
    constructor() {
        admin = msg.sender;
        authorizedWorkers[msg.sender] = true;
        allocationCount = 0;
        totalVulnerabilityScore = 0;
    }
    
    // Record a new allocation
    function recordAllocation(
        string memory _applicantId,
        uint256 _vulnerabilityScore,
        string memory _shelterUnitId
    ) public onlyAuthorized {
        require(bytes(_applicantId).length > 0, "Applicant ID cannot be empty");
        require(_vulnerabilityScore > 0, "Vulnerability score must be positive");
        require(bytes(_shelterUnitId).length > 0, "Shelter unit ID cannot be empty");
        
        // Check if allocation already exists
        require(
            allocations[_applicantId].timestamp == 0,
            "Allocation already exists for this applicant"
        );
        
        // Create new allocation
        allocations[_applicantId] = Allocation({
            applicantId: _applicantId,
            vulnerabilityScore: _vulnerabilityScore,
            shelterUnitId: _shelterUnitId,
            timestamp: block.timestamp,
            isApproved: true
        });
        
        // Update counters
        allocationCount++;
        totalVulnerabilityScore += _vulnerabilityScore;
        
        // Emit event
        emit AllocationRecorded(
            _applicantId,
            _vulnerabilityScore,
            _shelterUnitId,
            block.timestamp,
            msg.sender
        );
    }
    
    // Get allocation details
    function getAllocation(string memory _applicantId) public view returns (
        string memory,
        uint256,
        string memory,
        uint256,
        bool
    ) {
        Allocation memory alloc = allocations[_applicantId];
        require(alloc.timestamp > 0, "Allocation not found");
        
        return (
            alloc.applicantId,
            alloc.vulnerabilityScore,
            alloc.shelterUnitId,
            alloc.timestamp,
            alloc.isApproved
        );
    }
    
    // Get average vulnerability score
    function getAverageVulnerability() public view returns (uint256) {
        if (allocationCount == 0) return 0;
        return totalVulnerabilityScore / allocationCount;
    }
    
    // Authorization functions
    function authorizeWorker(address _worker) public onlyAdmin {
        authorizedWorkers[_worker] = true;
        emit WorkerAuthorized(_worker, true);
    }
    
    function revokeWorker(address _worker) public onlyAdmin {
        authorizedWorkers[_worker] = false;
        emit WorkerAuthorized(_worker, false);
    }
    
    // Emergency functions
    function changeAdmin(address _newAdmin) public onlyAdmin {
        require(_newAdmin != address(0), "Invalid address");
        address oldAdmin = admin;
        admin = _newAdmin;
        emit AdminChanged(oldAdmin, _newAdmin);
    }
    
    // Check if address is authorized
    function isAuthorized(address _address) public view returns (bool) {
        return _address == admin || authorizedWorkers[_address];
    }
    
    // Get contract statistics
    function getStats() public view returns (
        uint256,
        uint256,
        uint256,
        uint256
    ) {
        return (
            allocationCount,
            totalVulnerabilityScore,
            getAverageVulnerability(),
            block.timestamp
        );
    }
    
    // Fallback function - accept ETH
    receive() external payable {}
    
    // Withdraw funds (only admin)
    function withdrawFunds() public onlyAdmin {
        payable(admin).transfer(address(this).balance);
    }
}
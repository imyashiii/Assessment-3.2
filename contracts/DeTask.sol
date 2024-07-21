// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract DeTask {
    struct Task {
        uint256 id;
        string description;
        address creator;
        bool isCompleted;
    }

    uint256 public taskCount = 0;
    mapping(uint256 => Task) public tasks;

    event TaskCreated(uint256 id, string description, address creator);
    event TaskCompleted(uint256 id, address completer);

    modifier onlyCreator(uint256 taskId) {
        require(tasks[taskId].creator == msg.sender, "Only the creator can complete this task");
        _;
    }

    modifier taskExists(uint256 taskId) {
        require(taskId > 0 && taskId <= taskCount, "Task does not exist");
        _;
    }

    function createTask(string memory description) public {
        require(bytes(description).length > 0, "Task description cannot be empty");

        taskCount++;
        tasks[taskCount] = Task({
            id: taskCount,
            description: description,
            creator: msg.sender,
            isCompleted: false
        });

        emit TaskCreated(taskCount, description, msg.sender);
    }

    function completeTask(uint256 taskId) public taskExists(taskId) onlyCreator(taskId) {
        Task storage task = tasks[taskId];
        require(!task.isCompleted, "Task is already completed");
        task.isCompleted = true;
        emit TaskCompleted(taskId, msg.sender);
    }

    function getTaskName(uint taskId) public view taskExists(taskId) returns(string memory){
        Task storage task = tasks[taskId];
        return task.description;
    }

    function getCreator(uint taskId) public view taskExists(taskId) returns(address){
        Task storage task = tasks[taskId];
        return task.creator;
    }

    function checkTaskCompletion(uint256 taskId) public view taskExists(taskId) returns(bool){
        Task storage task = tasks[taskId];
        return task.isCompleted;
    }

    // Function to demonstrate revert
    function invalidateTask(uint256 taskId) public taskExists(taskId) onlyCreator(taskId) {
        Task storage task = tasks[taskId];
        require(!task.isCompleted, "Task is already completed");

        task.description = "";
        task.isCompleted = false;
        revert("Task has been invalidated and reset");
    }
}
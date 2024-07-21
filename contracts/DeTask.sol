// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


// Decentralized Auction management system
contract DeAuction {
    struct Auction {
        uint256 id;
        address payable seller;
        string item;
        uint256 basePrice;
        uint256 highestBid;
        address payable highestBidder;
        uint256 endTime;
        bool ended;
    }

    uint256 public itemsCount = 0;
    mapping(uint256 => Auction) public auctions;

    event AuctionCreated(uint256 id, address seller, string item, uint256 startPrice, uint256 endTime);
    event NewBidPlaced(uint256 auctionId, address bidder, uint256 amount);
    event AuctionEnded(uint256 auctionId, address winner, uint256 amount);

    modifier onlySeller(uint256 auctionId) {
        require(auctions[auctionId].seller == msg.sender, "Only the owner is allowed to end this auction");
        _;
    }

    modifier auctionExists(uint256 auctionId) {
        require(auctionId > 0 && auctionId <= itemsCount, "The auction was never existed");
        _;
    }

    modifier auctionNotEnded(uint256 auctionId) {
        require(!auctions[auctionId].ended, "Auction has already been ended");
        _;
    }

    modifier auctionInProgress(uint256 auctionId) {
        require(block.timestamp < auctions[auctionId].endTime, "Auction has already been ended");
        _;
    }

    function getNoOfItems()public view returns(uint){
        return itemsCount;
    }    

    function getItemName(uint256 auctionId) public view auctionExists(auctionId) returns (string memory) {
        return auctions[auctionId].item;
    }

    function getHighestBid(uint256 auctionId) public view auctionExists(auctionId) returns (uint) {
        return auctions[auctionId].highestBid;
    }

    function checkAuctionState(uint256 auctionId) public view auctionExists(auctionId) returns(bool) {
        return auctions[auctionId].ended;
    }

    // Function to add a new item for selling
    function createAuction(string memory item, uint256 basePrice, uint256 duration) public {
        require(bytes(item).length > 0, "Item name cannot be empty");
        require(basePrice > 0, "Starting price must be greater than 0");
        require(duration > 60, "Duration must be greater than 1 minute");

        itemsCount++;
        auctions[itemsCount] = Auction({
            id: itemsCount,
            seller: payable(msg.sender),
            item: item,
            basePrice: basePrice,
            highestBid: basePrice,
            highestBidder: payable(address(0)),
            endTime: block.timestamp + duration,
            ended: false
        });

        emit AuctionCreated(itemsCount, msg.sender, item, basePrice, block.timestamp + duration);
    }

    // Function to place a bid on an auction(item)
    function placeBid(uint256 auctionId, uint bidPrice) public payable auctionExists(auctionId) auctionNotEnded(auctionId) auctionInProgress(auctionId) {
        Auction storage auction = auctions[auctionId];
        if(bidPrice <= auction.highestBid){
            revert("Your bid can't be less than highest bid");
        } 

        if (auction.highestBidder != address(0)) {
            // Refund the previous highest bidder
            auction.highestBidder.transfer(auction.highestBid);
        }

        auction.highestBid = bidPrice;
        auction.highestBidder = payable(msg.sender);

        emit NewBidPlaced(auctionId, msg.sender, bidPrice);
    }

    // Function to end an auction and transfer the highest bid to the seller
    function endAuction(uint256 auctionId) public auctionExists(auctionId) onlySeller(auctionId) auctionNotEnded(auctionId) auctionInProgress(auctionId){
        Auction storage auction = auctions[auctionId];

        auction.ended = true;
        if (auction.highestBidder != address(0)) {
            auction.seller.transfer(auction.highestBid);
        }

        emit AuctionEnded(auctionId, auction.highestBidder, auction.highestBid);
    }

    function invalidateAuction(uint256 auctionId) public auctionExists(auctionId) onlySeller(auctionId) auctionNotEnded(auctionId){
        Auction storage auction = auctions[auctionId];

        auction.ended = true;
        if (auction.highestBidder != address(0)) {
            auction.highestBidder.transfer(auction.highestBid);
        }
        auction.highestBid = 0;
        auction.highestBidder= payable(address(0));
    }
}

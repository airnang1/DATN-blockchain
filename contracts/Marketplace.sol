pragma solidity ^0.8.0;

contract Marketplace {
    string public name;
    mapping(string => Product) public products;

    struct Product {
        string token;
        string name;
        uint256 price;
        address payable owner;
    }

    event ProductCreated(
        string token,
        string name,
        uint256 price,
        address payable owner
    );

    event ProductPurchased(
        string token,
        string name,
        uint256 price,
        address payable owner
    );

    enum SupplyChainState {
        Paided,
        Delivered
    }

    struct S_Order {
        string _userId;
        uint256 _orderPrice;
        address _userAddress;
        Marketplace.SupplyChainState _state;
    }

    event OrderChainStep(
        string _userId,
        uint256 _orderPrice,
        uint256 _step,
        address _userAddress
    );

    mapping(address => S_Order) public order;

    function createOrder(
        string memory _userId,
        uint256 _orderPrice,
        address _userAddress,
        address _ownerAddress
    ) external payable {
        order[_userAddress]._userId = _userId;
        order[_userAddress]._orderPrice = _orderPrice;
        order[_userAddress]._userAddress = _userAddress;

        require(msg.value > 0);
        payable(address(_ownerAddress)).transfer(msg.value);
        order[_userAddress]._state = SupplyChainState.Paided;

        // for (uint256 i = 0; i < _tokens.length; i++) {
        //     require(bytes(_tokens[i]).length > 0);
        //     Product memory _product = products[_tokens[i]];
        //     address payable _seller = _product.owner;
        //     require(msg.value >= _product.price);
        //     require(_seller != msg.sender);
        //     _product.owner = payable(msg.sender);
        //     products[_tokens[i]] = _product;
        //     emit ProductPurchased(
        //         _tokens[i],
        //         _product.name,
        //         _product.price,
        //         payable(msg.sender)
        //     );
        // }

        emit OrderChainStep(
            string(order[_userAddress]._userId),
            uint256(order[_userAddress]._orderPrice),
            uint256(order[_userAddress]._state),
            address(order[_userAddress]._userAddress)
        );
    }

    function createProduct(
        string memory _name,
        uint256 _price,
        string memory _token
    ) public {
        require(bytes(_name).length > 0);
        require(_price > 0);
        products[_token] = Product(_token, _name, _price, payable(msg.sender));
        emit ProductCreated(_token, _name, _price, payable(msg.sender));
    }

    receive() external payable {}
}

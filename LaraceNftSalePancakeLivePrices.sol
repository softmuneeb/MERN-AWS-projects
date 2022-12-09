interface IPancakePair {
    event Approval(address indexed owner, address indexed spender, uint value);
    event Transfer(address indexed from, address indexed to, uint value);

    function name() external pure returns (string memory);
    function symbol() external pure returns (string memory);
    function decimals() external pure returns (uint8);
    function totalSupply() external view returns (uint);
    function balanceOf(address owner) external view returns (uint);
    function allowance(address owner, address spender) external view returns (uint);

    function approve(address spender, uint value) external returns (bool);
    function transfer(address to, uint value) external returns (bool);
    function transferFrom(address from, address to, uint value) external returns (bool);

    function DOMAIN_SEPARATOR() external view returns (bytes32);
    function PERMIT_TYPEHASH() external pure returns (bytes32);
    function nonces(address owner) external view returns (uint);

    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;

    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
    event Swap(
        address indexed sender,
        uint amount0In,
        uint amount1In,
        uint amount0Out,
        uint amount1Out,
        address indexed to
    );
    event Sync(uint112 reserve0, uint112 reserve1);

    function MINIMUM_LIQUIDITY() external pure returns (uint);
    function factory() external view returns (address);
    function token0() external view returns (address);
    function token1() external view returns (address);
    function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
    function price0CumulativeLast() external view returns (uint);
    function price1CumulativeLast() external view returns (uint);
    function kLast() external view returns (uint);

    function mint(address to) external returns (uint liquidity);
    function burn(address to) external returns (uint amount0, uint amount1);
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;
    function skim(address to) external;
    function sync() external;

    function initialize(address, address) external;
}

contract BRANNBIL is ERC721Enumerable, Ownable {
    using Strings for uint256;
    IBEP20 public Token;
    IBEP20 public BUSD;
    IBEP20 public Token1;
    IPancakePair public bnbbusdlp;
    IPancakePair public Tokentobnblp;
    IPancakePair public Token1tobnblp;

    bool public paused = false;
    mapping(address => uint256) public addressMintedBalance;
    mapping(address => bool) public iswhitelist;
    uint256 public maxsupply = 10000;
    uint256 public ValueinToken;
    uint256 public ValueinToken1;
    uint256 public Valueinbnb;
    uint256 public ValueinToken_single;
    uint256 public Valueinbnb_single;
    uint256 public pricetime;
    bool public liveprice;
    bool public bnbmint;
    bool public tokenmint;
    bool public busdmint;

    uint256 public MinitngPricein_token = 2000; // token
    uint256 public MinitngPricein_token1 = 500; // token1
    uint256 public MinitngPrice_with_single = 2500; // token1
    uint256 public MinitngPricein_bnb = 2000; // bnb
    uint256 public MinitngPricein_busd = 2000e18; // busd
    uint256 public MinitngPricein_busd_single = 2500e18; // busd

    /////////////////whitelist prices/////////////////////////////
    uint256 public WhitelistMintingPricein_bnb = 1000000000000000000; //1 BNB
    uint256 public WhitelistMinitngPricein_token = 1000000000000000000; // 1 Token
    uint256 public WhitelistMinitngPricein_BUSD = 1000000000000000000; // 1 BUSD

    ///////////////////whitelist mint////////////////////
    uint256 public Whitelist_MaxLimitPerTransaction = 10;

    uint256 public MaxLimitPerTransaction = 5;

    bool public revealed = false;

    string public baseURI;
    string public notRevealedUri;
    string private baseExtension = ".png";
    mapping(address => uint256) public mintedNFTs;

    constructor(
        string memory _name,
        string memory _symbol,
        // string memory _initBaseURI,
        IBEP20 _Token,
        IBEP20 _BUSD,
        IBEP20 _Token1,
        IPancakePair _bnbtobusd,
        IPancakePair _Tokentobnblp,
        IPancakePair _Tokentobnblp1
    ) ERC721(_name, _symbol) {
        Token = _Token;
        BUSD = _BUSD;
        Token1 = _Token1;
        tokenmint = true;
        liveprice = true;
        bnbmint = true;
        busdmint = true;
        bnbbusdlp = _bnbtobusd;
        Tokentobnblp = _Tokentobnblp;
        Token1tobnblp = _Tokentobnblp1;
        iswhitelist[msg.sender] = true;
        excludefromlimits[msg.sender] = true;

        uint256 a = one$toToken();
        uint256 b = one$toToken1();
        ValueinToken = a * MinitngPricein_token;
        ValueinToken1 = b * MinitngPricein_token1;
        ValueinToken_single = a * MinitngPrice_with_single;
        Valueinbnb = BnbtoBusd() * MinitngPricein_bnb;
        Valueinbnb_single = BnbtoBusd() * MinitngPrice_with_single;
        pricetime = block.timestamp + 10 minutes;
    }

    // function mint_with_token1(
    //     uint256 _count,
    //     uint256 amount,
    //     uint256 amount1
    // ) public {
    //     mint_with_token1(0, 0, 0);
    //     mint_with_token1(_count, amount, amount1);
    // }

    function mint_with_token(
        uint256 _count,
        uint256 amount,
        uint256 amount1
    ) public {
        require(totalSupply() <= maxsupply, "Minitng Limit Exceeded!");
        require(paused == false, "paused by owner");
        require(tokenmint == true, "enable minting");

        uint256 token1 = ValueinToken1;
        uint256 token = ValueinToken;
        uint256 totalamount = token * _count;
        uint256 totalamountintoken1 = token1 * _count;

        if (iswhitelist[msg.sender] == true) {
            require(
                _count <= Whitelist_MaxLimitPerTransaction,
                "Whitelist Max Limit Per Transaction Exceed!"
            );
            require(
                amount >= _count * WhitelistMinitngPricein_token,
                "please enter token1"
            );
            for (uint256 i = 0; i < _count; i++) {
                uint256 mintIndex = totalSupply();
                _safeMint(msg.sender, mintIndex);
            }

            Token.transferFrom(msg.sender, address(this), amount);
            mintedNFTs[msg.sender] += _count;
        } else {
            require(
                _count <= MaxLimitPerTransaction,
                "Max Limit Per Transaction Exceed!"
            );
            require(amount >= totalamount, "please enter token2");
            require(amount1 >= totalamountintoken1, "please enter token2");

            for (uint256 i = 0; i < _count; i++) {
                uint256 mintIndex = totalSupply();
                _safeMint(msg.sender, mintIndex);
            }
            Token.transferFrom(msg.sender, address(this), amount);
            Token1.transferFrom(msg.sender, address(this), amount1);
            mintedNFTs[msg.sender] += _count;
        }
        if (block.timestamp > pricetime && liveprice == true) {
            uint256 a = one$toToken();
            uint256 b = one$toToken1();
            ValueinToken = a * MinitngPricein_token;
            ValueinToken1 = b * MinitngPricein_token1;
            ValueinToken_single = a * MinitngPrice_with_single;
            Valueinbnb = BnbtoBusd() * MinitngPricein_bnb;
            Valueinbnb_single = BnbtoBusd() * MinitngPrice_with_single;
            pricetime = block.timestamp + 10 minutes;
        }
    }

    function mint_with_single(uint256 _count, uint256 amount) public {
        require(totalSupply() <= maxsupply, "Minitng Limit Exceeded!");
        require(paused == false, "paused by owner");
        require(tokenmint == true, "enable minting");

        uint256 totalamount = ValueinToken_single * _count;

        if (iswhitelist[msg.sender] == true) {
            require(
                _count <= Whitelist_MaxLimitPerTransaction,
                "Whitelist Max Limit Per Transaction Exceed!"
            );
            require(
                amount >= _count * WhitelistMinitngPricein_token,
                "please enter token1"
            );
            for (uint256 i = 0; i < _count; i++) {
                uint256 mintIndex = totalSupply();
                _safeMint(msg.sender, mintIndex);
            }
            Token.transferFrom(msg.sender, address(this), amount);
            mintedNFTs[msg.sender] += _count;
        } else {
            require(
                _count <= MaxLimitPerTransaction,
                "Max Limit Per Transaction Exceed!"
            );
            require(amount >= totalamount, "please enter token2");

            for (uint256 i = 0; i < _count; i++) {
                uint256 mintIndex = totalSupply();
                _safeMint(msg.sender, mintIndex);
            }
            Token.transferFrom(msg.sender, address(this), amount);
            mintedNFTs[msg.sender] += _count;
        }

        if (block.timestamp > pricetime && liveprice == true) {
            uint256 a = one$toToken();
            uint256 b = one$toToken1();
            ValueinToken = a * MinitngPricein_token;
            ValueinToken1 = b * MinitngPricein_token1;
            ValueinToken_single = a * MinitngPrice_with_single;
            Valueinbnb = BnbtoBusd() * MinitngPricein_bnb;
            Valueinbnb_single = BnbtoBusd() * MinitngPrice_with_single;
            pricetime = block.timestamp + 10 minutes;
        }
    }

    function mint_with_bnb(uint256 _count, uint256 amount1) public payable {
        require(totalSupply() <= maxsupply, "Minitng Limit Exceeded!");
        require(paused == false, "paused by owner");
        require(bnbmint == true, "enable minting");

        uint256 totalamount = Valueinbnb * _count;
        uint256 totalamountintoken1 = ValueinToken1 * _count;

        if (iswhitelist[msg.sender] == true) {
            require(
                _count <= Whitelist_MaxLimitPerTransaction,
                "Whitelist Max Limit Per Transaction Exceed!"
            );
            require(
                msg.value >= _count * WhitelistMintingPricein_bnb,
                "please enter token1"
            );
            for (uint256 i = 0; i < _count; i++) {
                uint256 mintIndex = totalSupply();
                _safeMint(msg.sender, mintIndex);
            }
            mintedNFTs[msg.sender] += _count;
        } else {
            require(
                _count <= MaxLimitPerTransaction,
                "Max Limit Per Transaction Exceed!"
            );
            require(msg.value >= totalamount, "please enter token2");
            require(amount1 >= totalamountintoken1, "please enter token2");

            for (uint256 i = 0; i < _count; i++) {
                uint256 mintIndex = totalSupply();
                _safeMint(msg.sender, mintIndex);
            }
            Token1.transferFrom(msg.sender, address(this), amount1);
            mintedNFTs[msg.sender] += _count;
        }

        if (block.timestamp > pricetime && liveprice == true) {
            uint256 a = one$toToken();
            uint256 b = one$toToken1();
            ValueinToken = a * MinitngPricein_token;
            ValueinToken1 = b * MinitngPricein_token1;
            ValueinToken_single = a * MinitngPrice_with_single;
            Valueinbnb = BnbtoBusd() * MinitngPricein_bnb;
            Valueinbnb_single = BnbtoBusd() * MinitngPrice_with_single;
            pricetime = block.timestamp + 10 minutes;
        }
    }

    function mint_with_bnb(uint256 _count) public payable {
        require(totalSupply() <= maxsupply, "Minitng Limit Exceeded!");
        require(paused == false, "paused by owner");
        require(bnbmint == true, "enable minting");

        uint256 totalamount = Valueinbnb_single * _count;

        if (iswhitelist[msg.sender] == true) {
            require(
                _count <= Whitelist_MaxLimitPerTransaction,
                "Whitelist Max Limit Per Transaction Exceed!"
            );
            require(
                msg.value >= _count * WhitelistMintingPricein_bnb,
                "please enter token1"
            );
            for (uint256 i = 0; i < _count; i++) {
                uint256 mintIndex = totalSupply();
                _safeMint(msg.sender, mintIndex);
            }
            mintedNFTs[msg.sender] += _count;
        } else {
            require(
                _count <= MaxLimitPerTransaction,
                "Max Limit Per Transaction Exceed!"
            );
            require(msg.value >= totalamount, "please enter token2");

            for (uint256 i = 0; i < _count; i++) {
                uint256 mintIndex = totalSupply();
                _safeMint(msg.sender, mintIndex);
            }
            mintedNFTs[msg.sender] += _count;
        }

        if (block.timestamp > pricetime && liveprice == true) {
            uint256 a = one$toToken();
            uint256 b = one$toToken1();
            ValueinToken = a * MinitngPricein_token;
            ValueinToken1 = b * MinitngPricein_token1;
            ValueinToken_single = a * MinitngPrice_with_single;
            Valueinbnb = BnbtoBusd() * MinitngPricein_bnb;
            Valueinbnb_single = BnbtoBusd() * MinitngPrice_with_single;
            pricetime = block.timestamp + 10 minutes;
        }
    }

    function mint_with_BUSD(
        uint256 _count,
        uint256 amount,
        uint256 amount1
    ) public {
        require(totalSupply() <= maxsupply, "Minitng Limit Exceeded!");
        require(paused == false, "paused by owner");
        require(busdmint == true, "enable minting");

        uint256 totalamount = MinitngPricein_busd * _count;
        uint256 totalamountintoken1 = ValueinToken1 * _count;

        if (iswhitelist[msg.sender] == true) {
            require(
                _count <= Whitelist_MaxLimitPerTransaction,
                "Whitelist Max Limit Per Transaction Exceed!"
            );
            require(
                amount >= _count * WhitelistMinitngPricein_token,
                "please enter token1"
            );
            for (uint256 i = 0; i < _count; i++) {
                uint256 mintIndex = totalSupply();
                _safeMint(msg.sender, mintIndex);
            }
            BUSD.transferFrom(msg.sender, address(this), amount);
            mintedNFTs[msg.sender] += _count;
        } else {
            require(
                _count <= MaxLimitPerTransaction,
                "Max Limit Per Transaction Exceed!"
            );
            require(amount >= totalamount, "please enter token2");
            require(amount1 >= totalamountintoken1, "please enter token2");

            for (uint256 i = 0; i < _count; i++) {
                uint256 mintIndex = totalSupply();
                _safeMint(msg.sender, mintIndex);
            }
            BUSD.transferFrom(msg.sender, address(this), amount);
            Token1.transferFrom(msg.sender, address(this), amount1);
            mintedNFTs[msg.sender] += _count;
        }

        if (block.timestamp > pricetime && liveprice == true) {
            uint256 a = one$toToken();
            uint256 b = one$toToken1();
            ValueinToken = a * MinitngPricein_token;
            ValueinToken1 = b * MinitngPricein_token1;
            ValueinToken_single = a * MinitngPrice_with_single;
            Valueinbnb = BnbtoBusd() * MinitngPricein_bnb;
            Valueinbnb_single = BnbtoBusd() * MinitngPrice_with_single;
            pricetime = block.timestamp + 10 minutes;
        }
    }

    function mint_with_BUSD_100(uint256 _count, uint256 amount) public {
        require(totalSupply() <= maxsupply, "Minitng Limit Exceeded!");
        require(paused == false, "paused by owner");
        require(busdmint == true, "enable minting");

        uint256 totalamount = MinitngPricein_busd_single * _count;

        if (iswhitelist[msg.sender] == true) {
            require(
                _count <= Whitelist_MaxLimitPerTransaction,
                "Whitelist Max Limit Per Transaction Exceed!"
            );
            require(
                amount >= _count * WhitelistMinitngPricein_token,
                "please enter token1"
            );
            for (uint256 i = 0; i < _count; i++) {
                uint256 mintIndex = totalSupply();
                _safeMint(msg.sender, mintIndex);
            }
            BUSD.transferFrom(msg.sender, address(this), amount);
            mintedNFTs[msg.sender] += _count;
        } else {
            require(
                _count <= MaxLimitPerTransaction,
                "Max Limit Per Transaction Exceed!"
            );
            require(amount >= totalamount, "please enter token2");

            for (uint256 i = 0; i < _count; i++) {
                uint256 mintIndex = totalSupply();
                _safeMint(msg.sender, mintIndex);
            }
            BUSD.transferFrom(msg.sender, address(this), amount);
            mintedNFTs[msg.sender] += _count;
        }

        if (block.timestamp > pricetime && liveprice == true) {
            uint256 a = one$toToken();
            uint256 b = one$toToken1();
            ValueinToken = a * MinitngPricein_token;
            ValueinToken1 = b * MinitngPricein_token1;
            ValueinToken_single = a * MinitngPrice_with_single;
            Valueinbnb = BnbtoBusd() * MinitngPricein_bnb;
            Valueinbnb_single = BnbtoBusd() * MinitngPrice_with_single;
            pricetime = block.timestamp + 10 minutes;
        }
    }

    function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory ownedTokenIds = new uint256[](ownerTokenCount);
        uint256 currentTokenId = 0;
        uint256 ownedTokenIndex = 0;

        while (
            ownedTokenIndex < ownerTokenCount && currentTokenId <= maxsupply
        ) {
            address currentTokenOwner = ownerOf(currentTokenId);

            if (currentTokenOwner == _owner) {
                ownedTokenIds[ownedTokenIndex] = currentTokenId;

                ownedTokenIndex++;
            }

            currentTokenId++;
        }

        return ownedTokenIds;
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        if (revealed == false) {
            return notRevealedUri;
        }

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        _tokenId.toString(),
                        baseExtension
                    )
                )
                : "";
    }

    function setRevealed(bool _state) public onlyOwner {
        revealed = _state;
    }

    function reveal() public onlyOwner {
        revealed = true;
    }

    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setbaseExtension(string memory _newbaseExtension)
        public
        onlyOwner
    {
        baseExtension = _newbaseExtension;
    }

    function setnotRevealedUri(string memory _newnotRevealedUri)
        public
        onlyOwner
    {
        notRevealedUri = _newnotRevealedUri;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setpricetime(uint256 _time) public onlyOwner {
        pricetime = _time;
    }

    // //////////////////////////////////////////////////////////////////////////
    //  onlyOwner
    // //////////////////////////////////////////////////////////////////////////

    function ClaimBNB(uint256 _amount) external onlyOwner {
        payable(msg.sender).transfer(_amount);
    }

    function ClaimBUSD(uint256 _amount) external onlyOwner {
        BUSD.transfer(msg.sender, _amount);
    }

    function Claimtoken(uint256 _amount) external onlyOwner {
        Token.transfer(msg.sender, _amount);
    }

    function unpaused() external onlyOwner {
        paused = true;
    }

    function pausedminting() external onlyOwner {
        paused = false;
    }

    function unpaused_bnb_mint() external onlyOwner {
        paused = true;
    }

    function paused_bnb_min() external onlyOwner {
        paused = false;
    }

    function setMaxSupply(uint256 _amount) external onlyOwner {
        require(_amount >= maxsupply, "Limit is already set");
        maxsupply = _amount;
    }

    function setMaxLimitPerTransaction(uint256 _amount) external onlyOwner {
        MaxLimitPerTransaction = _amount;
    }

    /////////////////////////Whitelist value////////////////////////////////

    function setwhitelist(address _addr, bool _state) external onlyOwner {
        iswhitelist[_addr] = _state;
    }

    function SetWhitelistMintingPricein_BNB(uint256 _value) external onlyOwner {
        WhitelistMintingPricein_bnb = _value;
    }

    function SetWhitelistMinitngPricein_Token(uint256 _value)
        external
        onlyOwner
    {
        WhitelistMinitngPricein_token = _value;
    }

    function SetWhitelistMinitngPricein_BUSD(uint256 _value)
        external
        onlyOwner
    {
        WhitelistMinitngPricein_BUSD = _value;
    }

    function setWhitelist_MaxLimitPerTransaction(uint256 _value)
        external
        onlyOwner
    {
        Whitelist_MaxLimitPerTransaction = _value;
    }

    function SetMinitngPricein_Token(uint256 _value) external onlyOwner {
        MinitngPricein_token = _value;
    }

    function SetMinitngPrice_with_single(uint256 _value) external onlyOwner {
        MinitngPrice_with_single = _value;
    }

    function SetMinitngPricein_bnb(uint256 _value) external onlyOwner {
        MinitngPricein_bnb = _value;
    }

    function SetMinitngPricein_busd(uint256 _value) external onlyOwner {
        MinitngPricein_busd = _value;
    }

    function SetMinitngPricein_token1(uint256 _value) external onlyOwner {
        MinitngPricein_token1 = _value;
    }

    function setTokenprice(uint256 value) external onlyOwner {
        ValueinToken = value;
    }

    function setToken1price(uint256 value) external onlyOwner {
        ValueinToken1 = value;
    }

    function set_ValueinToken_single_price(uint256 value) external onlyOwner {
        ValueinToken_single = value;
    }

    function set_Valueinbnb_single_price(uint256 value) external onlyOwner {
        Valueinbnb_single = value;
    }

    function setlivepriceenable() external onlyOwner {
        liveprice = true;
    }

    function setlivepricedisenable() external onlyOwner {
        liveprice = false;
    }

    function setMinitngPricein_busd_single(uint256 amount) external onlyOwner {
        MinitngPricein_busd_single = amount;
    }

    function withdraw(uint256 _amount) external onlyOwner {
        payable(msg.sender).transfer(_amount);
    }

    function withdrawothertoken(address _addr, uint256 _amount)
        external
        onlyOwner
    {
        IBEP20(_addr).transfer(msg.sender, _amount);
    }

    function withdrawBUSDtoken(uint256 _amount) external onlyOwner {
        BUSD.transfer(msg.sender, _amount);
    }

    function withdrawtoken(uint256 _amount) external onlyOwner {
        Token.transfer(msg.sender, _amount);
    }

    function setlimit(uint256 _newdays) public onlyOwner {
        limit = _newdays;
    }

    function setstaking(address _stakingcontract) public onlyOwner {
        staking = _stakingcontract;
    }

    function setexcludefromlimits(address _addr) public onlyOwner {
        excludefromlimits[_addr] = true;
    }

    function setenablemintwithtoken() public onlyOwner {
        tokenmint = true;
    }

    function setDisablemintwithtoken() public onlyOwner {
        tokenmint = false;
    }

    function setenablemintwith_bnb() public onlyOwner {
        bnbmint = true;
    }

    function setDisablemintwith_bnb() public onlyOwner {
        bnbmint = false;
    }

    function setenablemintwith_busd() public onlyOwner {
        busdmint = true;
    }

    function setDisablemintwith_busd() public onlyOwner {
        busdmint = false;
    }

    //........................................price.....................................................................

    function BnbtoBusd() public view returns (uint256) {
        (uint256 a, uint256 b, uint256 c) = bnbbusdlp.getReserves();

        uint256 z = (a * 1e18) / b;
        return z
    }

    function BUSDtobnb() public view returns (uint256) {
        (uint256 a, uint256 b, uint256 c) = bnbbusdlp.getReserves();
        uint256 z = (b * 1e18) / a;
        return z;
    }

    function Tokentobnb() public view returns (uint256) {
        (uint256 a, uint256 b, uint256 c) = Tokentobnblp.getReserves();
        uint256 z = (a * 1e18) / b;
        return z;
    }

    function Token1tobnb() public view returns (uint256) {
        (uint256 a, uint256 b, uint256 c) = Token1tobnblp.getReserves();
        uint256 z = (a * 1e18) / b;
        return z;
    }

    function bnbtoToken1() public view returns (uint256) {
        (uint256 a, uint256 b, uint256 c) = Token1tobnblp.getReserves();

        uint256 z = (b * 1e18) / a;
        return z;
    }

    function bnbtoToken() public view returns (uint256) {
        (uint256 a, uint256 b, uint256 c) = Tokentobnblp.getReserves();

        uint256 z = (b * 1e18) / a;
        return z;
    }

    function one$toToken() public view returns (uint256) {
        uint256 a = BnbtoBusd();
        uint256 b = a * Tokentobnb();
        return b / 1e18;
    }

    function one$toToken1() public view returns (uint256) {
        uint256 a = BnbtoBusd();
        uint256 b = a * Token1tobnb();
        return b / 1e18;
    }

    // LaRace token 0x052775Cf897b3eC894F26b8d801C514123c305D1
    // BUSD 0xe9e7cea3dedca5984780bafc599bd69add087d56
    // BNBtoBUSDLP 0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16
    // laracetoBNBLP 0x2345Cc01b37E155BDfd393389298D1aab4CDbd68

    // wirelp   0xf1559bbC172681Faf9F0C88e9AE8E675eA0DD096
    // wire     0x3b3CD14d6D2fc39A68630582c2EB8ec98C21A81e
}

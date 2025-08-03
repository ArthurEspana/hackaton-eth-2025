 /// @notice Constructor que establece el propietario del contrato
    constructor() Ownable(msg.sender) {}

    /// @notice Crea una nueva campaña de donación
    /// @param _title Título de la campaña
    /// @param _description Descripción de la campaña
    /// @param _goal Meta de recaudación en wei
    function createCampaign(
        string memory _title,
        string memory _description,
        uint256 _goal
    ) external {
        if (_goal == 0) revert ZeroGoal();

        campaignCount++;
        campaigns[campaignCount] = Campaign({
            creator: payable(msg.sender),
            title: _title,
            description: _description,
            goal: _goal,
            raised: 0,
            isActive: true
        });

        emit CampaignCreated(campaignCount, msg.sender, _title, _goal);
    }

    /// @notice Permite a cualquier usuario donar a una campaña específica
    /// @param _campaignId ID de la campaña
    function donate(uint256 _campaignId) external payable {
        Campaign storage c = campaigns[_campaignId];
        if (_campaignId == 0 || _campaignId > campaignCount) revert CampaignNotFound();
        if (!c.isActive) revert CampaignNotActive();
        if (msg.value == 0) revert ZeroDonation();
        if (c.raised + msg.value > c.goal) revert DonationExceedsGoal();

        c.raised += msg.value;
        donations[_campaignId][msg.sender] += msg.value;

        // Desactiva la campaña si se alcanza la meta
        if (c.raised == c.goal) {
            c.isActive = false;
        }

        emit DonationReceived(_campaignId, msg.sender, msg.value);
    }

    /// @notice Permite al creador retirar los fondos recaudados
    /// @param _campaignId ID de la campaña
    function withdrawFunds(uint256 _campaignId) external nonReentrant {
        Campaign storage c = campaigns[_campaignId];
        if (_campaignId == 0 || _campaignId > campaignCount) revert CampaignNotFound();
        if (msg.sender != c.creator) revert NotCreator();
        if (c.raised == 0) revert NoFundsToWithdraw();

        uint256 amount = c.raised;
        c.raised = 0;
        c.isActive = false; // Desactiva la campaña al retirar fondos

        (bool sent, ) = c.creator.call{value: amount}("");
        if (!sent) revert TransferFailed();

        emit FundsWithdrawn(_campaignId, msg.sender, amount);
    }

    /// @notice Devuelve los datos de una campaña
    /// @param _campaignId ID de la campaña
    function getCampaign(uint256 _campaignId)
        external
        view
        returns (
            address creator,
            string memory title,
            string memory description,
            uint256 goal,
            uint256 raised,
            bool isActive
        )
    {
        if (_campaignId == 0 || _campaignId > campaignCount) revert CampaignNotFound();
        Campaign memory c = campaigns[_campaignId];
        return (c.creator, c.title, c.description, c.goal, c.raised, c.isActive);
    }

    /// @notice Permite al creador desactivar una campaña
    /// @param _campaignId ID de la campaña
    function deactivateCampaign(uint256 _campaignId) external {
        Campaign storage c = campaigns[_campaignId];
        if (_campaignId == 0 || _campaignId > campaignCount) revert CampaignNotFound();
        if (msg.sender != c.creator) revert NotCreator();
        if (!c.isActive) revert AlreadyDeactivated();

        c.isActive = false;
        emit CampaignDeactivated(_campaignId);
    }

    /// @notice Devuelve la cantidad donada por un usuario a una campaña
    /// @param _campaignId ID de la campaña
    /// @param _donor Dirección del donante
    function getDonationAmount(uint256 _campaignId, address _donor) external view returns (uint256) {
        if (_campaignId == 0 || _campaignId > campaignCount) revert CampaignNotFound();
        return donations[_campaignId][_donor];
    }
}

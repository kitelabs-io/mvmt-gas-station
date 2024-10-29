import { AptosConnectButton } from "@razorlabs/wallet-kit"
import styled from "styled-components"

const ConnectWalletButton = styled(AptosConnectButton)`
	* {
		font-weight: bold;
		color: black;
	}

	.wkit-connected-button {
		padding: 0px;
		background-color: unset;
	}

	.wkit-connected-button__balance,
	.wkit-connected-button__divider {
		display: none;
	}

	.wkit-disconnect-button,
	.wkit-disconnect-button__container {
		height: 44px;
		border-radius: 8px;
	}

	.wkit-disconnect-button__container {
		bottom: -50px;
	}
`

export default ConnectWalletButton

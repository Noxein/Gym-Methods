import { UserPurposeType } from "@/app/types";
import { BottomMenuCasual } from "./BottomMenuCasual";
import BottomMenuTrener from "./BottomMenuTrener";

type PurposeMenuProps = {
    purpose?: UserPurposeType;
    trainercurrentaccounttype?: string | null;
}

function PurposeMenu({ purpose, trainercurrentaccounttype }: PurposeMenuProps) {
    if (purpose === 'Casual' || trainercurrentaccounttype === 'Casual') return <BottomMenuCasual />
    if (purpose === 'Trener' || trainercurrentaccounttype === 'Trener') return <BottomMenuTrener />

    return <BottomMenuCasual />

}

export default PurposeMenu;
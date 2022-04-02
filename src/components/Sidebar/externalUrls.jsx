import { ReactComponent as DocsIcon } from "src/assets/icons/docs.svg";
import { SvgIcon } from "@material-ui/core";
import { Trans } from "@lingui/macro";

const externalUrls = [
  {
    title: <Trans>Docs</Trans>,
    url: "",
    icon: <SvgIcon color="primary" component={DocsIcon} />,
  }
];

export default externalUrls;

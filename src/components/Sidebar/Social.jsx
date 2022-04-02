import { SvgIcon, Link } from "@material-ui/core";
import { ReactComponent as GitHub } from "../../assets/icons/github.svg";
import { ReactComponent as Medium } from "../../assets/icons/medium.svg";
import { ReactComponent as Twitter } from "../../assets/icons/twitter.svg";
import { ReactComponent as Discord } from "../../assets/icons/discord.svg";
import { SOCIAL_LINKS } from "src/constants";
import styled from 'styled-components';

// const


export default function Social() {
  return (
    <div className="social-row">
      <Link href={SOCIAL_LINKS.github} target="_blank">
        <GitHub></GitHub>
      </Link>

      <Link href={SOCIAL_LINKS.medium} target="_blank">
        <Medium></Medium>
      </Link>

      <Link href={SOCIAL_LINKS.twitter} target="_blank">
        <Twitter></Twitter>
      </Link>

      <Link href={SOCIAL_LINKS.discord} target="_blank">
        <Discord></Discord>
      </Link>
    </div>
  );
}

import React, {CSSProperties, FunctionComponent} from "react";
import styled from "styled-components";
import {graphql, useStaticQuery} from "gatsby";
import {SiteMetadata} from "../../utils/models";
import SocialChannelList from "../social-channel-list";
import Avatar from "../avatar";
import Theme from "../../styles/theme";

interface BioProps {
  textAlign: 'left' | 'center' | 'right' | 'justify';
  avatarStyle?: CSSProperties;
  showName?: boolean;
}

const StyledBio = styled.section<Pick<BioProps, 'textAlign'>>`
  margin: auto;
  text-align: ${props => props.textAlign};
  width: 100%;
`;

const AuthorDescription = styled.p`
  margin: 10px 0 13px;

  h2 {
    padding-top: 1rem;
    span {
      background: linear-gradient(135deg, ${Theme.layout.primaryColor} 55%, ${Theme.layout.linkColor} 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  a {
    color: #000;
    text-decoration: underline;
  }
`;

const AuthorName = styled.h3`
  margin: 10px;
`;

const Bio: FunctionComponent<BioProps> = ({textAlign = 'center', avatarStyle, showName = false}) => {
  const metadata = useStaticQuery<SiteMetadata>(graphql`
    query MetadataQuery {
      site {
        siteMetadata {
          author {
            name
            description
            social {
              github
              youtube
              instagram
              facebook
              twitter
              linkedin
              twitch
            }
          }
        }
      }
    }
  `);

  const author = metadata.site.siteMetadata.author;

  return (
    <StyledBio textAlign={textAlign}>
      <Avatar alt={author.name} style={avatarStyle} />
      {showName && <AuthorName>{author.name}</AuthorName>}
      <AuthorDescription dangerouslySetInnerHTML={{__html: author.description}}/>
      <SocialChannelList channels={author.social}/>
    </StyledBio>
  );
};

export default Bio;

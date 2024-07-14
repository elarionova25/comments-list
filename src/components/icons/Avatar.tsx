import React from 'react';
import styled from 'styled-components'

const AvatarItem = styled.div<{ $src?: string;}>`
    border-radius: 50%;
    height: 58px;
    width: 58px;
    margin-right: 20px;
    background-size: cover;
    background-position: unset;
    background-repeat: no-repeat;
    background-image: ${ (props) => `url(${ props.$src })` };
`
interface IAvatar {
   avatarSrc: string,
}

const Avatar: React.FC<IAvatar> = ({ avatarSrc }) => {
   return  <AvatarItem $src={ avatarSrc }/>
}

export default Avatar;
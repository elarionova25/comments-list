import React from 'react';
import styled from 'styled-components';
import { ActiveHeartIcon, DefaultHeartIcon, DisabledHeartIcon } from '../../assets/icons';

const Icon = styled.div`
        height: 100%;
`;

interface IHeartIcon {
    isInteractive: boolean;
    isLiked: boolean;
}
const HeartIcon: React.FC<IHeartIcon> = ({ isInteractive, isLiked }) => {
    if (!isInteractive) {
        return (
            <Icon>
                <DisabledHeartIcon/>
            </Icon>
        )
    }

    if (isLiked) {
        return (
            <Icon>
                <ActiveHeartIcon/>
            </Icon>
        )
    }

    return (
        <Icon>
            <DefaultHeartIcon/>
        </Icon>
    )
}

export default HeartIcon;
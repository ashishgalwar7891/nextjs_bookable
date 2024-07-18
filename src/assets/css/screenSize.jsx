import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Tag, Tooltip } from 'antd';
import { FC, memo } from 'react';

const ScreenSizeDisplayContainer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 0;
`;

const ScreenSizeDisplay = memo(() => {
  const { screen } = useTheme();

  return (
    <ScreenSizeDisplayContainer >
      <Tooltip
        title={'Shows Screen Sizes (For Development purpose only)'}
        placement={'topRight'}
      >
        <Tag color={'coral'}>
          <b>{screen}</b>
        </Tag>
      </Tooltip>
    </ScreenSizeDisplayContainer>
  );
});

ScreenSizeDisplay.displayName = 'ScreenSizeDisplay';

export default ScreenSizeDisplay;

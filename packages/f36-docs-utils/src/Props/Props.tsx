import React from 'react';
import {
  Grid,
  List,
  Paragraph,
  Subheading,
  Text,
  TextLink,
  Flex,
} from '@contentful/f36-components';

import { ExternalLinkIcon } from '@contentful/f36-icons';

import { getPropsStyles } from './Props.styles';

import { usePropsOf } from './PropsContext';
import { PropertyValue } from './PropertyValue';
import { PropertyType } from './PropertyType';

interface PropsProps {
  of: string;
  storybookPath?: string;
}

function StorybookLink({ storybookPath }: { storybookPath: string }) {
  return (
    <Flex marginBottom="spacingS" flexDirection="row-reverse">
      <TextLink
        href={`https://v4-f36-storybook.netlify.app/?path=${storybookPath}`}
        target="_blank"
        alignIcon="end"
        icon={<ExternalLinkIcon />}
      >
        Open in Storybook
      </TextLink>
    </Flex>
  );
}

export function Props({ of, storybookPath }: PropsProps) {
  const styles = getPropsStyles();
  const componentProps = usePropsOf(of);

  if (componentProps.length === 0) {
    return null;
  }

  return (
    <>
      {storybookPath && <StorybookLink storybookPath={storybookPath} />}
      <List className={styles.list}>
        {componentProps.map((item, idx) => {
          return (
            <List.Item key={idx} className={styles.listItem}>
              <Grid columns="20% 1fr" columnGap="spacingM" rowGap="spacingM">
                <Text fontColor="gray500">Name</Text>
                <Subheading marginBottom="none">
                  {item.name}
                  {item.required && (
                    <Text marginLeft="spacingXs" fontColor="gray500">
                      (required)
                    </Text>
                  )}
                </Subheading>

                {item.description && (
                  <>
                    <Text fontColor="gray500">Description</Text>
                    <Paragraph marginBottom="none">
                      {item.description}
                    </Paragraph>
                  </>
                )}

                <Grid.Item columnStart={2}>
                  <PropertyType name={item.name} type={item.type} />
                </Grid.Item>

                {item.defaultValue && (
                  <>
                    <Text fontColor="gray500">Default</Text>
                    <PropertyValue value={item.defaultValue.value} />
                  </>
                )}
              </Grid>
            </List.Item>
          );
        })}
      </List>
    </>
  );
}
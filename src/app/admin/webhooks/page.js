// src/app/admin/webhooks/page.js
"use client";
import React from 'react';
import styled from 'styled-components';
import WebhookLogs from '@/component/Admin/WebhookLogs';
import { BiCodeAlt, BiCopy } from 'react-icons/bi';

const WebhooksPage = () => {
  const webhookUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/clerk`;
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <PageContainer>
      <Header>
        <Title>Webhook Configuration</Title>
        <Subtitle>
          Configure Clerk webhooks to sync user data with your database
        </Subtitle>
      </Header>

      <Section>
        <SectionTitle>Webhook URL</SectionTitle>
        <WebhookUrlContainer>
          <WebhookUrl>{webhookUrl}</WebhookUrl>
          <CopyButton onClick={() => copyToClipboard(webhookUrl)}>
            <BiCopy size={18} />
            Copy
          </CopyButton>
        </WebhookUrlContainer>
        <SectionDescription>
          Use this URL in your Clerk Dashboard to configure webhooks. 
          Go to Clerk Dashboard → Webhooks → Add Endpoint and paste this URL.
        </SectionDescription>
      </Section>

      <Section>
        <SectionTitle>Recommended Events</SectionTitle>
        <EventList>
          <EventItem>
            <EventName>user.created</EventName>
            <EventDescription>Triggered when a new user signs up</EventDescription>
          </EventItem>
          <EventItem>
            <EventName>user.updated</EventName>
            <EventDescription>Triggered when user profile is updated</EventDescription>
          </EventItem>
          <EventItem>
            <EventName>user.deleted</EventName>
            <EventDescription>Triggered when a user is deleted</EventDescription>
          </EventItem>
        </EventList>
      </Section>

      <Section>
        <SectionTitle>Sample Webhook Payload</SectionTitle>
        <CodeBlock>
          <pre>
{`{
  "data": {
    "id": "user_123abc",
    "email_addresses": [
      {
        "id": "email_123",
        "email_address": "user@example.com",
        "verification": { "status": "verified" }
      }
    ],
    "primary_email_address_id": "email_123",
    "username": "exampleuser"
  },
  "object": "event",
  "type": "user.created"
}`}
          </pre>
        </CodeBlock>
      </Section>

      <Section>
        <WebhookLogs />
      </Section>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(4)};
`;

const Header = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.font.heading};
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.typography.font.body};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
`;

const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.elevation.low};
  padding: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.25rem;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const SectionDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.95rem;
  margin-top: ${({ theme }) => theme.spacing(2)};
  line-height: 1.6;
`;

const WebhookUrlContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => `${theme.colors.secondary}30`};
`;

const WebhookUrl = styled.code`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.font.mono};
  font-size: 0.9rem;
  flex: 1;
  overflow-x: auto;
  white-space: nowrap;
  padding: ${({ theme }) => theme.spacing(1)};
`;

const CopyButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(2)}`};
  cursor: pointer;
  font-size: 0.9rem;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const EventItem = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.md};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
`;

const EventName = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.font.mono};
  font-size: 0.9rem;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const EventDescription = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.85rem;
`;

const CodeBlock = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing(3)};
  overflow-x: auto;

  pre {
    color: ${({ theme }) => theme.colors.text.primary};
    font-family: ${({ theme }) => theme.typography.font.mono};
    font-size: 0.9rem;
    margin: 0;
  }
`;

export default WebhooksPage;

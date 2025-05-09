// src/component/Admin/WebhookLogs.js
"use client";
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BiRefresh, BiCheckCircle, BiErrorCircle, BiInfoCircle } from 'react-icons/bi';

const WebhookLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/webhooks/logs');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch logs: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      setLogs(data.logs || []);
    } catch (err) {
      console.error('Error fetching webhook logs:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    
    // Set up polling for logs every 30 seconds
    const interval = setInterval(fetchLogs, 30000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <BiCheckCircle size={18} color="#4CAF50" />;
      case 'error':
        return <BiErrorCircle size={18} color="#F44336" />;
      case 'received':
      case 'skipped':
        return <BiInfoCircle size={18} color="#61DAFB" />;
      default:
        return <BiInfoCircle size={18} color="#B3B3B3" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Container>
      <Header>
        <Title>Webhook Logs</Title>
        <RefreshButton onClick={fetchLogs} disabled={loading}>
          <BiRefresh size={20} className={loading ? 'spin' : ''} />
          Refresh
        </RefreshButton>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {logs.length === 0 ? (
        <EmptyState>
          <p>No webhook logs found</p>
        </EmptyState>
      ) : (
        <LogTable>
          <thead>
            <tr>
              <th>Time</th>
              <th>Event Type</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <LogRow key={log.id} $status={log.status}>
                <td>{formatDate(log.timestamp)}</td>
                <td>{log.eventType}</td>
                <td>
                  <StatusIndicator>
                    {getStatusIcon(log.status)}
                    <span>{log.status}</span>
                  </StatusIndicator>
                </td>
                <td>
                  {log.error ? (
                    <ErrorDetail>{log.error}</ErrorDetail>
                  ) : (
                    <ViewDetailsButton
                      onClick={() => {
                        alert(log.data);
                      }}
                    >
                      View Details
                    </ViewDetailsButton>
                  )}
                </td>
              </LogRow>
            ))}
          </tbody>
        </LogTable>
      )}
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.elevation.low};
  padding: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.5rem;
  margin: 0;
`;

const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(2)}`};
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => `${theme.colors.error}20`};
  color: ${({ theme }) => theme.colors.error};
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radii.md};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(6)};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const LogTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    padding: ${({ theme }) => theme.spacing(2)};
    border-bottom: 1px solid ${({ theme }) => `${theme.colors.secondary}30`};
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 0.9rem;
    font-weight: 500;
  }

  td {
    padding: ${({ theme }) => theme.spacing(2)};
    border-bottom: 1px solid ${({ theme }) => `${theme.colors.secondary}15`};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const LogRow = styled.tr`
  background-color: ${({ theme, $status }) => {
    switch ($status) {
      case 'error':
        return `${theme.colors.error}10`;
      case 'success':
        return `${theme.colors.success}10`;
      default:
        return 'transparent';
    }
  }};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const ErrorDetail = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.9rem;
`;

const ViewDetailsButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: ${({ theme }) => `${theme.spacing(0.5)} ${theme.spacing(1)}`};
  font-size: 0.8rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover {
    background-color: ${({ theme }) => `${theme.colors.primary}15`};
  }
`;

export default WebhookLogs;

// src/app/github/style.js
import styled from "styled-components";
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

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  color: ${({ theme }) => theme.colors.text.secondary};

  .spin {
    animation: spin 1.5s linear infinite;
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => `${theme.colors.error}20`};
  border-left: 4px solid ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.md};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    background-color: ${({ theme }) => theme.colors.error};
    color: white;
    border: none;
    border-radius: ${({ theme }) => theme.radii.sm};
    padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(2)}`};
    cursor: pointer;
  }
`;

const ConnectSection = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(8)} 0;
`;

const ConnectCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.elevation.medium};
  padding: ${({ theme }) => theme.spacing(6)};
  max-width: 500px;
  text-align: center;

  h2 {
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }

  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: ${({ theme }) => theme.spacing(4)};
  }
`;

const ConnectButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(4)}`};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
  }
`;

const RepositoriesSection = styled.section`
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(4)};

  h2 {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 1.5rem;
    margin-bottom: ${({ theme }) => theme.spacing(1)};
  }
`;

const ConnectedText = styled.div`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: 0.9rem;
`;

// New components for the layout
const LayoutContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(4)};
  margin-top: ${({ theme }) => theme.spacing(4)};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchContainer = styled.div`
  flex: 1;
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(3)}`};
  box-shadow: ${({ theme }) => theme.elevation.low};

  svg {
    color: ${({ theme }) => theme.colors.text.tertiary};
    margin-right: ${({ theme }) => theme.spacing(2)};
  }
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1rem;
  width: 100%;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  min-width: 250px;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(3)}`};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.elevation.low};
  transition: ${({ theme }) => theme.motion.quick};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const SelectedRepo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  font-weight: 500;
  text-align: left;
`;

const DropdownList = styled.div`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing(1)});
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.elevation.medium};
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(3)}`};
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};
  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? `${theme.colors.primary}15` : "transparent"};

  &:hover {
    background-color: ${({ theme, $isSelected }) =>
      $isSelected ? `${theme.colors.primary}25` : theme.colors.surfaceHover};
  }
`;

const RepoVisibilityTag = styled.span`
  margin-left: auto;
  font-size: 0.7rem;
  background-color: ${({ theme, $private }) =>
    $private ? `${theme.colors.error}30` : `${theme.colors.success}30`};
  color: ${({ theme, $private }) =>
    $private ? theme.colors.error : theme.colors.success};
  padding: ${({ theme }) => `${theme.spacing(0.5)} ${theme.spacing(1)}`};
  border-radius: ${({ theme }) => theme.radii.pill};
`;

const RepositoryDetail = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.elevation.medium};
  padding: ${({ theme }) => theme.spacing(4)};
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

const RepoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(3)};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing(2)};
  }
`;

const RepoTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.5rem;
`;

const RepoVisibility = styled.span`
  background-color: ${({ theme, $private }) =>
    $private ? `${theme.colors.error}30` : `${theme.colors.success}30`};
  color: ${({ theme, $private }) =>
    $private ? theme.colors.error : theme.colors.success};
  font-size: 0.8rem;
  padding: ${({ theme }) => `${theme.spacing(0.5)} ${theme.spacing(1.5)}`};
  border-radius: ${({ theme }) => theme.radii.pill};
  margin-left: ${({ theme }) => theme.spacing(2)};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.spacing(1.5)} ${theme.spacing(2.5)}`};
  font-size: 0.9rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
  }
`;

const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.spacing(1.5)} ${theme.spacing(2.5)}`};
  font-size: 0.9rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const RepoDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  line-height: 1.6;
`;

const RepoBranches = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const BranchesTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.1rem;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const BranchesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing(2)};
`;

const BranchItem = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radii.sm};
  background-color: ${({ theme }) => `${theme.colors.secondary}15`};
`;

const BranchName = styled.div`
  color: ${({ theme, $isDefault }) =>
    $isDefault ? theme.colors.primary : theme.colors.text.primary};
  font-weight: ${({ $isDefault }) => ($isDefault ? 600 : 400)};
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};

  &::before {
    content: "";
    display: ${({ $isDefault }) => ($isDefault ? "block" : "none")};
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const BranchCommitInfo = styled.div`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: 0.8rem;
  margin-top: ${({ theme }) => theme.spacing(0.5)};
`;

const RepoActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const ActionButton = styled.button`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.secondary : theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.spacing(1.5)} ${theme.spacing(3)}`};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  flex: 1;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
  }
`;

const ViewRepoButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(1)};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.spacing(1.5)} ${theme.spacing(3)}`};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  flex: 1;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    transform: translateY(-2px);
  }
`;

const EmptyState = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing(6)};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
`;

export {
  PageContainer,
  Header,
  Title,
  Subtitle,
  LoadingContainer,
  ErrorMessage,
  ConnectSection,
  ConnectCard,
  ConnectButton,
  RepositoriesSection,
  SectionHeader,
  ConnectedText,
  LayoutContainer,
  SearchContainer,
  SearchInputContainer,
  SearchInput,
  DropdownContainer,
  DropdownButton,
  SelectedRepo,
  DropdownList,
  DropdownItem,
  RepoVisibilityTag,
  RepositoryDetail,
  RepoHeader,
  RepoTitle,
  RepoVisibility,
  ActionButtons,
  AddButton,
  RefreshButton,
  RepoDescription,
  RepoBranches,
  BranchesTitle,
  BranchesList,
  BranchItem,
  BranchName,
  BranchCommitInfo,
  RepoActions,
  ActionButton,
  ViewRepoButton,
  EmptyState,
};

import React from 'react';
import { createUltimatePagination } from 'react-ultimate-pagination';
import paginationStyles from '../../styles/components/Pagination.module.scss';
import { useAppSelector } from '../../hooks';

type PageProps = {
  isActive?: boolean;
  onClick: () => void;
  disabled: boolean;
  value: number;
};
type EllipsisProps = {
  onClick: () => void;
  disabled: boolean;
};

type PageLinkProps = {
  onClick: () => void;
  disabled: boolean;
};

type WrapperProps = {
  children: React.ReactNode;
};

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
};
const Button = ({
  onClick,
  disabled,
  children,
  className,
}: PageLinkProps & ButtonProps) => {
  const { darkMode } = useAppSelector((state) => state.themeReducer);
  return (
    <button
      className={`${paginationStyles['page-link']} ${className} ${
        darkMode ? 'warm-blue' : 'dark-blue'
      } ${
        darkMode
          ? paginationStyles['page-link-dark-mode']
          : paginationStyles['page-link-light-mode']
      }`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
const Page = (props: any) => {
  const { isActive, onClick } = props as PageProps;
  const { disabled, value } = props as PageProps;
  const { darkMode } = useAppSelector((state) => state.themeReducer);
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={`${
        isActive
          ? darkMode
            ? `${paginationStyles['active-dark-mode']} ${paginationStyles.active}`
            : `${paginationStyles['active-light-mode']} ${paginationStyles.active}`
          : ''
      } `}
    >
      {value}
    </Button>
  );
};

const Ellipsis = (props: any) => {
  const { onClick, disabled } = props as EllipsisProps;
  return (
    <Button onClick={onClick} disabled={disabled}>
      ...
    </Button>
  );
};

const FirstPageLink = (props: any) => {
  const { onClick, disabled } = props as PageLinkProps;
  return (
    <Button onClick={onClick} disabled={disabled}>
      First
    </Button>
  );
};

const PreviousPageLink = (props: any) => {
  const { onClick, disabled } = props as PageLinkProps;
  return (
    <Button onClick={onClick} disabled={disabled}>
      Previous
    </Button>
  );
};

const NextPageLink = (props: any) => {
  const { onClick, disabled } = props as PageLinkProps;
  return (
    <Button onClick={onClick} disabled={disabled}>
      Next
    </Button>
  );
};

const LastPageLink = (props: any) => {
  const { onClick, disabled } = props as PageLinkProps;
  return (
    <Button onClick={onClick} disabled={disabled}>
      Last
    </Button>
  );
};

const Wrapper = (props: WrapperProps) => {
  const { children } = props;
  return <div className={paginationStyles.pagination}>{children}</div>;
};

const itemTypeToComponent = {
  PAGE: Page,
  ELLIPSIS: Ellipsis,
  FIRST_PAGE_LINK: FirstPageLink,
  PREVIOUS_PAGE_LINK: PreviousPageLink,
  NEXT_PAGE_LINK: NextPageLink,
  LAST_PAGE_LINK: LastPageLink,
};

const UltimatePagination = createUltimatePagination({
  itemTypeToComponent,
  WrapperComponent: Wrapper,
});
export const Pagination = UltimatePagination;
export default Pagination;

import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Timestamp: any;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  temporaryPassword?: Maybe<Scalars['String']>;
  token: Scalars['String'];
  user: User;
};

export type Battery = {
  __typename?: 'Battery';
  createdAt: Scalars['Timestamp'];
  description: Scalars['String'];
  id: Scalars['ID'];
  ovens: Array<Oven>;
  plant: CokePlant;
  updatedAt: Scalars['Timestamp'];
};

export type CokePlant = {
  __typename?: 'CokePlant';
  address: Scalars['String'];
  batteries?: Maybe<Array<Battery>>;
  createdAt: Scalars['Timestamp'];
  id: Scalars['ID'];
  name: Scalars['String'];
  nit: Scalars['String'];
  updatedAt: Scalars['Timestamp'];
  users?: Maybe<Array<User>>;
};

export type CreateAccountInput = {
  email: Scalars['String'];
  fullName: Scalars['String'];
  phoneNumber: Scalars['String'];
  plantId: Scalars['ID'];
};

export type CreateBatteryInput = {
  description: Scalars['String'];
};

export type CreateCokePlantInput = {
  address: Scalars['String'];
  name: Scalars['String'];
  nit: Scalars['String'];
};

export type CreateOvenInput = {
  batteryId: Scalars['ID'];
  description?: InputMaybe<Scalars['String']>;
  number: Scalars['Float'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  blockUser: User;
  createAccount: AuthResponse;
  createBattery: Battery;
  createCokePlant: CokePlant;
  createOven: Oven;
  login: AuthResponse;
  updateCokePlant: CokePlant;
  updatePassword: AuthResponse;
  updateUser: User;
};


export type MutationBlockUserArgs = {
  id: Scalars['ID'];
};


export type MutationCreateAccountArgs = {
  createAccountInput: CreateAccountInput;
};


export type MutationCreateBatteryArgs = {
  createBatteryInput: CreateBatteryInput;
};


export type MutationCreateCokePlantArgs = {
  createCokePlantInput: CreateCokePlantInput;
};


export type MutationCreateOvenArgs = {
  createOvenInput: CreateOvenInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationUpdateCokePlantArgs = {
  updateCokePlantInput: UpdateCokePlantInput;
};


export type MutationUpdatePasswordArgs = {
  updatePasswordInput: UpdatePasswordInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Oven = {
  __typename?: 'Oven';
  battery: Battery;
  createdAt: Scalars['Timestamp'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  number: Scalars['Int'];
  status: OvenStatus;
  updatedAt: Scalars['Timestamp'];
};

export enum OvenStatus {
  Active = 'active',
  Inactive = 'inactive'
}

export type Query = {
  __typename?: 'Query';
  batteries: Array<Battery>;
  cokePlant: CokePlant;
  getAllPlants: Array<CokePlant>;
  getAllUsers: Array<User>;
  getUser: User;
  me: User;
  revalidate: AuthResponse;
};


export type QueryCokePlantArgs = {
  id: Scalars['ID'];
};


export type QueryGetAllUsersArgs = {
  roles?: InputMaybe<Array<ValidRoles>>;
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};

export type UpdateCokePlantInput = {
  address?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  nit?: InputMaybe<Scalars['String']>;
};

export type UpdatePasswordInput = {
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  fullName?: InputMaybe<Scalars['String']>;
  hasSetPassword?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  password?: InputMaybe<Scalars['String']>;
  plantId?: InputMaybe<Scalars['ID']>;
  roles?: InputMaybe<Array<ValidRoles>>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Timestamp'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  hasSetPassword: Scalars['Boolean'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  lastUpdateBy?: Maybe<User>;
  plant: CokePlant;
  roles: Array<ValidRoles>;
  updatedAt: Scalars['Timestamp'];
};

export enum ValidRoles {
  Admin = 'admin',
  SuperAdmin = 'superAdmin',
  SuperUser = 'superUser',
  User = 'user'
}

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, fullName: string, email: string, roles: Array<ValidRoles>, isActive: boolean, hasSetPassword: boolean } };

export type UserLoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type UserLoginMutation = { __typename?: 'Mutation', session: { __typename?: 'AuthResponse', token: string, user: { __typename?: 'User', id: string, fullName: string, email: string, roles: Array<ValidRoles>, isActive: boolean, hasSetPassword: boolean } } };

export type SessionBaseFragment = { __typename?: 'AuthResponse', token: string, user: { __typename?: 'User', id: string, fullName: string, email: string, roles: Array<ValidRoles>, isActive: boolean, hasSetPassword: boolean } };

export type UserBaseFragment = { __typename?: 'User', id: string, fullName: string, email: string, roles: Array<ValidRoles>, isActive: boolean, hasSetPassword: boolean };

export const UserBaseFragmentDoc = gql`
    fragment UserBase on User {
  id
  fullName
  email
  roles
  isActive
  hasSetPassword
}
    `;
export const SessionBaseFragmentDoc = gql`
    fragment SessionBase on AuthResponse {
  token
  user {
    ...UserBase
  }
}
    ${UserBaseFragmentDoc}`;
export const MeDocument = gql`
    query me {
  me {
    ...UserBase
  }
}
    ${UserBaseFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const UserLoginDocument = gql`
    mutation userLogin($email: String!, $password: String!) {
  session: login(loginInput: {email: $email, password: $password}) {
    token
    user {
      ...UserBase
    }
  }
}
    ${UserBaseFragmentDoc}`;
export type UserLoginMutationFn = ApolloReactCommon.MutationFunction<UserLoginMutation, UserLoginMutationVariables>;

/**
 * __useUserLoginMutation__
 *
 * To run a mutation, you first call `useUserLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userLoginMutation, { data, loading, error }] = useUserLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUserLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UserLoginMutation, UserLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UserLoginMutation, UserLoginMutationVariables>(UserLoginDocument, options);
      }
export type UserLoginMutationHookResult = ReturnType<typeof useUserLoginMutation>;
export type UserLoginMutationResult = ApolloReactCommon.MutationResult<UserLoginMutation>;
export type UserLoginMutationOptions = ApolloReactCommon.BaseMutationOptions<UserLoginMutation, UserLoginMutationVariables>;
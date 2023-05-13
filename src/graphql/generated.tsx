import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a date and time in the UTC
   * timezone. The DateTime appears in a JSON response as an ISO8601 formatted
   * string, including UTC timezone ("Z"). The parsed date and time string will
   * be converted to UTC if there is an offset.
   */
  DateTime: any;
};

export type AppSubscription = {
  __typename?: 'AppSubscription';
  appStoreOriginalTransactionId?: Maybe<Scalars['String']>;
  appStoreReceipt?: Maybe<Scalars['String']>;
  /** The last known expiry date for the subscription. Note that this may be out of date as subscription data may only be synced as a subscription nears or passes it's expiry date. */
  expiresAt: Scalars['DateTime'];
  firstCheckedAt: Scalars['DateTime'];
  googlePlayPurchaseToken?: Maybe<Scalars['String']>;
  googlePlaySubscriptionProductId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastCheckedAt: Scalars['DateTime'];
  platform: Platform;
};

export type DraftProfile = {
  __typename?: 'DraftProfile';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  profilePicture?: Maybe<ImageMedia>;
};

export type ImageMedia = {
  __typename?: 'ImageMedia';
  id: Scalars['ID'];
  mimeType: Scalars['String'];
  thumbnailUrl: Scalars['String'];
  /** A presigned URL to PUT the media content. Only accessible to the owner of the media. Expected errors: unauthorised */
  uploadUrl: Scalars['String'];
  url: Scalars['String'];
};

export type NotificationDevice = {
  __typename?: 'NotificationDevice';
  id: Scalars['ID'];
  token: Scalars['String'];
};

export enum Platform {
  AppStore = 'APP_STORE',
  GooglePlay = 'GOOGLE_PLAY',
  Mock = 'MOCK',
}

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['ID'];
  isMe: Scalars['Boolean'];
  name: Scalars['String'];
  profilePicture?: Maybe<ImageMedia>;
};

export type RootMutationType = {
  __typename?: 'RootMutationType';
  /** Submits a app store subscription receipt for the current user to create a new subscription. If a subscription already exists for this receipt, it's expiry will be rechecked. This should be done on app startup. Expected errors: invalid_app_store_receipt */
  appSubscriptionSubmitOrRefreshAppStoreReceipt: AppSubscription;
  /** Submits a google play subscription purchase token for the current user to create a new subscription. If a subscription already exists for this purchase token, it's expiry will be rechecked. This should be done on app startup. Expected errors: invalid_google_play_purchase_token */
  appSubscriptionSubmitOrRefreshGooglePlayPurchaseToken: AppSubscription;
  /** Rechecks the expiry date for all of the current user's subscriptions. This should only be used if there is a reason to believe that the subscription may have changed, the Relationship.subscriptionStatus field will recheck the subscriptions if they are at or near expiry. */
  appSubscriptionsRecheck: Array<AppSubscription>;
  /** Create a new image media with presigned upload URLs. Expected errors: media_file_extension_not_supported */
  imageMediaCreate: ImageMedia;
  /** Creates a push notification device for an FCM token. This is an upsert and is safe to recall with the same token. */
  notificationDeviceCreate: NotificationDevice;
  /** Removes the push notification device for the FCM token. */
  notificationDeviceDelete: NotificationDevice;
  /** Updates the current users' profile name. Expected errors: name_too_long */
  profileUpdateName: User;
  /** Updates the current users' profile profile picture. Expected errors: image_media_not_found */
  profileUpdateProfilePicture: User;
  /** Deletes the current user's account including all database tables and deleting all media from S3 */
  userDelete: User;
  /** Logs in a user based on their phone number. If they don't have an existing account then a new blank account is created. Expected errors: incorrect_verification_code, invalid_phone_number, too_many_check_attempts */
  userLoginOrSignup: Session;
  /** Sends a verification code to the user's phone number. This can be used for signing up, logging in or changing phone numbers. Expected errors: too_many_send_attempts, too_many_send_attempts */
  userSendPhoneNumberVerificationCode: Scalars['String'];
  /** Updates a user's phone number.Expected errors: phone_number_already_in_user, incorrect_verification_code, invalid_phone_number, too_many_check_attempts */
  userUpdatePhoneNumber: User;
  /** Create a new video media with presigned upload URLs. Expected errors: video_media_duration_seconds_must_be_positive, media_file_extension_not_supported */
  videoMediaCreate: VideoMedia;
};

export type RootMutationTypeAppSubscriptionSubmitOrRefreshAppStoreReceiptArgs = {
  appStoreReceipt: Scalars['String'];
};

export type RootMutationTypeAppSubscriptionSubmitOrRefreshGooglePlayPurchaseTokenArgs = {
  googlePlayPurchaseToken: Scalars['String'];
  googlePlaySubscriptionProductId: Scalars['String'];
};

export type RootMutationTypeImageMediaCreateArgs = {
  fileExtension: Scalars['String'];
  mimeType: Scalars['String'];
};

export type RootMutationTypeNotificationDeviceCreateArgs = {
  token: Scalars['String'];
};

export type RootMutationTypeNotificationDeviceDeleteArgs = {
  token: Scalars['String'];
};

export type RootMutationTypeProfileUpdateNameArgs = {
  name: Scalars['String'];
};

export type RootMutationTypeProfileUpdateProfilePictureArgs = {
  profilePictureId: Scalars['ID'];
};

export type RootMutationTypeUserLoginOrSignupArgs = {
  phoneNumber: Scalars['String'];
  verificationCode: Scalars['String'];
};

export type RootMutationTypeUserSendPhoneNumberVerificationCodeArgs = {
  phoneNumber: Scalars['String'];
};

export type RootMutationTypeUserUpdatePhoneNumberArgs = {
  phoneNumber: Scalars['String'];
  verificationCode: Scalars['String'];
};

export type RootMutationTypeVideoMediaCreateArgs = {
  durationSeconds: Scalars['Float'];
  fileExtension: Scalars['String'];
  mimeType: Scalars['String'];
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  /** Returns the current user's account */
  me: User;
  /** Gets static content by name */
  static: Static;
};

export type RootQueryTypeStaticArgs = {
  name: Scalars['String'];
};

export type Session = {
  __typename?: 'Session';
  token: Scalars['String'];
  user: User;
};

export type Static = {
  __typename?: 'Static';
  content: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  /** All distinct app subscriptions for this user, ordered from the latest expiration date. Includes expired subscriptions. Note that this is an expensive call and should only be done once on app startup or if a subscription is changed. */
  appSubscriptions: Array<AppSubscription>;
  draftProfile?: Maybe<DraftProfile>;
  id: Scalars['ID'];
  notificationDevices: Array<NotificationDevice>;
  phoneNumber: Scalars['String'];
  /** The profile of this user which is shown to other users */
  profile?: Maybe<Profile>;
  state: UserState;
};

export enum UserState {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export type VideoMedia = {
  __typename?: 'VideoMedia';
  durationSeconds: Scalars['Float'];
  id: Scalars['ID'];
  mimeType: Scalars['String'];
  /** A presigned URL to PUT the media content. Only accessible to the owner of the media. Expected errors: unauthorised */
  uploadUrl: Scalars['String'];
  url: Scalars['String'];
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'RootQueryType';
  me: {
    __typename?: 'User';
    id: string;
    phoneNumber: string;
    state: UserState;
    profile?:
      | {
          __typename?: 'Profile';
          id: string;
          isMe: boolean;
          name: string;
          profilePicture?:
            | {
                __typename?: 'ImageMedia';
                id: string;
                mimeType: string;
                thumbnailUrl: string;
                uploadUrl: string;
                url: string;
              }
            | null
            | undefined;
        }
      | null
      | undefined;
    draftProfile?:
      | {
          __typename?: 'DraftProfile';
          id: string;
          name?: string | null | undefined;
          profilePicture?:
            | {
                __typename?: 'ImageMedia';
                id: string;
                mimeType: string;
                thumbnailUrl: string;
                uploadUrl: string;
                url: string;
              }
            | null
            | undefined;
        }
      | null
      | undefined;
  };
};

export type ProfileUpdateNameMutationVariables = Exact<{
  name: Scalars['String'];
}>;

export type ProfileUpdateNameMutation = {
  __typename?: 'RootMutationType';
  profileUpdateName: {
    __typename?: 'User';
    id: string;
    phoneNumber: string;
    state: UserState;
    profile?:
      | {
          __typename?: 'Profile';
          id: string;
          isMe: boolean;
          name: string;
          profilePicture?:
            | {
                __typename?: 'ImageMedia';
                id: string;
                mimeType: string;
                thumbnailUrl: string;
                uploadUrl: string;
                url: string;
              }
            | null
            | undefined;
        }
      | null
      | undefined;
    draftProfile?:
      | {
          __typename?: 'DraftProfile';
          id: string;
          name?: string | null | undefined;
          profilePicture?:
            | {
                __typename?: 'ImageMedia';
                id: string;
                mimeType: string;
                thumbnailUrl: string;
                uploadUrl: string;
                url: string;
              }
            | null
            | undefined;
        }
      | null
      | undefined;
  };
};

export type ProfileUpdateProfilePictureMutationVariables = Exact<{
  profilePictureId: Scalars['ID'];
}>;

export type ProfileUpdateProfilePictureMutation = {
  __typename?: 'RootMutationType';
  profileUpdateProfilePicture: {
    __typename?: 'User';
    id: string;
    phoneNumber: string;
    state: UserState;
    profile?:
      | {
          __typename?: 'Profile';
          id: string;
          isMe: boolean;
          name: string;
          profilePicture?:
            | {
                __typename?: 'ImageMedia';
                id: string;
                mimeType: string;
                thumbnailUrl: string;
                uploadUrl: string;
                url: string;
              }
            | null
            | undefined;
        }
      | null
      | undefined;
    draftProfile?:
      | {
          __typename?: 'DraftProfile';
          id: string;
          name?: string | null | undefined;
          profilePicture?:
            | {
                __typename?: 'ImageMedia';
                id: string;
                mimeType: string;
                thumbnailUrl: string;
                uploadUrl: string;
                url: string;
              }
            | null
            | undefined;
        }
      | null
      | undefined;
  };
};

export type UserLoginOrSignupMutationVariables = Exact<{
  phoneNumber: Scalars['String'];
  verificationCode: Scalars['String'];
}>;

export type UserLoginOrSignupMutation = {
  __typename?: 'RootMutationType';
  userLoginOrSignup: {
    __typename?: 'Session';
    token: string;
    user: {
      __typename?: 'User';
      id: string;
      phoneNumber: string;
      state: UserState;
      profile?:
        | {
            __typename?: 'Profile';
            id: string;
            isMe: boolean;
            name: string;
            profilePicture?:
              | {
                  __typename?: 'ImageMedia';
                  id: string;
                  mimeType: string;
                  thumbnailUrl: string;
                  uploadUrl: string;
                  url: string;
                }
              | null
              | undefined;
          }
        | null
        | undefined;
      draftProfile?:
        | {
            __typename?: 'DraftProfile';
            id: string;
            name?: string | null | undefined;
            profilePicture?:
              | {
                  __typename?: 'ImageMedia';
                  id: string;
                  mimeType: string;
                  thumbnailUrl: string;
                  uploadUrl: string;
                  url: string;
                }
              | null
              | undefined;
          }
        | null
        | undefined;
    };
  };
};

export type UserSendPhoneNumberVerificationCodeMutationVariables = Exact<{
  mobileNumber: Scalars['String'];
}>;

export type UserSendPhoneNumberVerificationCodeMutation = {
  __typename?: 'RootMutationType';
  userSendPhoneNumberVerificationCode: string;
};

export type DraftProfileBaseFragment = {
  __typename?: 'DraftProfile';
  id: string;
  name?: string | null | undefined;
  profilePicture?:
    | { __typename?: 'ImageMedia'; id: string; mimeType: string; thumbnailUrl: string; uploadUrl: string; url: string }
    | null
    | undefined;
};

export type ImageMediaBaseFragment = {
  __typename?: 'ImageMedia';
  id: string;
  mimeType: string;
  thumbnailUrl: string;
  uploadUrl: string;
  url: string;
};

export type ProfileBaseFragment = {
  __typename?: 'Profile';
  id: string;
  isMe: boolean;
  name: string;
  profilePicture?:
    | { __typename?: 'ImageMedia'; id: string; mimeType: string; thumbnailUrl: string; uploadUrl: string; url: string }
    | null
    | undefined;
};

export type SessionBaseFragment = {
  __typename?: 'Session';
  token: string;
  user: {
    __typename?: 'User';
    id: string;
    phoneNumber: string;
    state: UserState;
    profile?:
      | {
          __typename?: 'Profile';
          id: string;
          isMe: boolean;
          name: string;
          profilePicture?:
            | {
                __typename?: 'ImageMedia';
                id: string;
                mimeType: string;
                thumbnailUrl: string;
                uploadUrl: string;
                url: string;
              }
            | null
            | undefined;
        }
      | null
      | undefined;
    draftProfile?:
      | {
          __typename?: 'DraftProfile';
          id: string;
          name?: string | null | undefined;
          profilePicture?:
            | {
                __typename?: 'ImageMedia';
                id: string;
                mimeType: string;
                thumbnailUrl: string;
                uploadUrl: string;
                url: string;
              }
            | null
            | undefined;
        }
      | null
      | undefined;
  };
};

export type UserBaseFragment = {
  __typename?: 'User';
  id: string;
  phoneNumber: string;
  state: UserState;
  profile?:
    | {
        __typename?: 'Profile';
        id: string;
        isMe: boolean;
        name: string;
        profilePicture?:
          | {
              __typename?: 'ImageMedia';
              id: string;
              mimeType: string;
              thumbnailUrl: string;
              uploadUrl: string;
              url: string;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
  draftProfile?:
    | {
        __typename?: 'DraftProfile';
        id: string;
        name?: string | null | undefined;
        profilePicture?:
          | {
              __typename?: 'ImageMedia';
              id: string;
              mimeType: string;
              thumbnailUrl: string;
              uploadUrl: string;
              url: string;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type VideoMediaBaseFragment = {
  __typename?: 'VideoMedia';
  id: string;
  durationSeconds: number;
  mimeType: string;
  url: string;
  uploadUrl: string;
};

export const ImageMediaBaseFragmentDoc = gql`
  fragment ImageMediaBase on ImageMedia {
    id
    mimeType
    thumbnailUrl
    uploadUrl
    url
  }
`;
export const ProfileBaseFragmentDoc = gql`
  fragment ProfileBase on Profile {
    id
    isMe
    name
    profilePicture {
      ...ImageMediaBase
    }
  }
  ${ImageMediaBaseFragmentDoc}
`;
export const DraftProfileBaseFragmentDoc = gql`
  fragment DraftProfileBase on DraftProfile {
    id
    name
    profilePicture {
      ...ImageMediaBase
    }
  }
  ${ImageMediaBaseFragmentDoc}
`;
export const UserBaseFragmentDoc = gql`
  fragment UserBase on User {
    id
    phoneNumber
    state
    profile {
      ...ProfileBase
    }
    draftProfile {
      ...DraftProfileBase
    }
  }
  ${ProfileBaseFragmentDoc}
  ${DraftProfileBaseFragmentDoc}
`;
export const SessionBaseFragmentDoc = gql`
  fragment SessionBase on Session {
    token
    user {
      ...UserBase
    }
  }
  ${UserBaseFragmentDoc}
`;
export const VideoMediaBaseFragmentDoc = gql`
  fragment VideoMediaBase on VideoMedia {
    id
    durationSeconds
    mimeType
    url
    uploadUrl
  }
`;
export const MeDocument = gql`
  query me {
    me {
      ...UserBase
    }
  }
  ${UserBaseFragmentDoc}
`;

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
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const ProfileUpdateNameDocument = gql`
  mutation profileUpdateName($name: String!) {
    profileUpdateName(name: $name) {
      ...UserBase
    }
  }
  ${UserBaseFragmentDoc}
`;
export type ProfileUpdateNameMutationFn = ApolloReactCommon.MutationFunction<
  ProfileUpdateNameMutation,
  ProfileUpdateNameMutationVariables
>;

/**
 * __useProfileUpdateNameMutation__
 *
 * To run a mutation, you first call `useProfileUpdateNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProfileUpdateNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [profileUpdateNameMutation, { data, loading, error }] = useProfileUpdateNameMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useProfileUpdateNameMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<ProfileUpdateNameMutation, ProfileUpdateNameMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<ProfileUpdateNameMutation, ProfileUpdateNameMutationVariables>(
    ProfileUpdateNameDocument,
    options,
  );
}
export type ProfileUpdateNameMutationHookResult = ReturnType<typeof useProfileUpdateNameMutation>;
export type ProfileUpdateNameMutationResult = ApolloReactCommon.MutationResult<ProfileUpdateNameMutation>;
export type ProfileUpdateNameMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ProfileUpdateNameMutation,
  ProfileUpdateNameMutationVariables
>;
export const ProfileUpdateProfilePictureDocument = gql`
  mutation profileUpdateProfilePicture($profilePictureId: ID!) {
    profileUpdateProfilePicture(profilePictureId: $profilePictureId) {
      ...UserBase
    }
  }
  ${UserBaseFragmentDoc}
`;
export type ProfileUpdateProfilePictureMutationFn = ApolloReactCommon.MutationFunction<
  ProfileUpdateProfilePictureMutation,
  ProfileUpdateProfilePictureMutationVariables
>;

/**
 * __useProfileUpdateProfilePictureMutation__
 *
 * To run a mutation, you first call `useProfileUpdateProfilePictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProfileUpdateProfilePictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [profileUpdateProfilePictureMutation, { data, loading, error }] = useProfileUpdateProfilePictureMutation({
 *   variables: {
 *      profilePictureId: // value for 'profilePictureId'
 *   },
 * });
 */
export function useProfileUpdateProfilePictureMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ProfileUpdateProfilePictureMutation,
    ProfileUpdateProfilePictureMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    ProfileUpdateProfilePictureMutation,
    ProfileUpdateProfilePictureMutationVariables
  >(ProfileUpdateProfilePictureDocument, options);
}
export type ProfileUpdateProfilePictureMutationHookResult = ReturnType<typeof useProfileUpdateProfilePictureMutation>;
export type ProfileUpdateProfilePictureMutationResult =
  ApolloReactCommon.MutationResult<ProfileUpdateProfilePictureMutation>;
export type ProfileUpdateProfilePictureMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ProfileUpdateProfilePictureMutation,
  ProfileUpdateProfilePictureMutationVariables
>;
export const UserLoginOrSignupDocument = gql`
  mutation userLoginOrSignup($phoneNumber: String!, $verificationCode: String!) {
    userLoginOrSignup(phoneNumber: $phoneNumber, verificationCode: $verificationCode) {
      token
      user {
        ...UserBase
      }
    }
  }
  ${UserBaseFragmentDoc}
`;
export type UserLoginOrSignupMutationFn = ApolloReactCommon.MutationFunction<
  UserLoginOrSignupMutation,
  UserLoginOrSignupMutationVariables
>;

/**
 * __useUserLoginOrSignupMutation__
 *
 * To run a mutation, you first call `useUserLoginOrSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserLoginOrSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userLoginOrSignupMutation, { data, loading, error }] = useUserLoginOrSignupMutation({
 *   variables: {
 *      phoneNumber: // value for 'phoneNumber'
 *      verificationCode: // value for 'verificationCode'
 *   },
 * });
 */
export function useUserLoginOrSignupMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UserLoginOrSignupMutation, UserLoginOrSignupMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<UserLoginOrSignupMutation, UserLoginOrSignupMutationVariables>(
    UserLoginOrSignupDocument,
    options,
  );
}
export type UserLoginOrSignupMutationHookResult = ReturnType<typeof useUserLoginOrSignupMutation>;
export type UserLoginOrSignupMutationResult = ApolloReactCommon.MutationResult<UserLoginOrSignupMutation>;
export type UserLoginOrSignupMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UserLoginOrSignupMutation,
  UserLoginOrSignupMutationVariables
>;
export const UserSendPhoneNumberVerificationCodeDocument = gql`
  mutation userSendPhoneNumberVerificationCode($mobileNumber: String!) {
    userSendPhoneNumberVerificationCode(phoneNumber: $mobileNumber)
  }
`;
export type UserSendPhoneNumberVerificationCodeMutationFn = ApolloReactCommon.MutationFunction<
  UserSendPhoneNumberVerificationCodeMutation,
  UserSendPhoneNumberVerificationCodeMutationVariables
>;

/**
 * __useUserSendPhoneNumberVerificationCodeMutation__
 *
 * To run a mutation, you first call `useUserSendPhoneNumberVerificationCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserSendPhoneNumberVerificationCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userSendPhoneNumberVerificationCodeMutation, { data, loading, error }] = useUserSendPhoneNumberVerificationCodeMutation({
 *   variables: {
 *      mobileNumber: // value for 'mobileNumber'
 *   },
 * });
 */
export function useUserSendPhoneNumberVerificationCodeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UserSendPhoneNumberVerificationCodeMutation,
    UserSendPhoneNumberVerificationCodeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    UserSendPhoneNumberVerificationCodeMutation,
    UserSendPhoneNumberVerificationCodeMutationVariables
  >(UserSendPhoneNumberVerificationCodeDocument, options);
}
export type UserSendPhoneNumberVerificationCodeMutationHookResult = ReturnType<
  typeof useUserSendPhoneNumberVerificationCodeMutation
>;
export type UserSendPhoneNumberVerificationCodeMutationResult =
  ApolloReactCommon.MutationResult<UserSendPhoneNumberVerificationCodeMutation>;
export type UserSendPhoneNumberVerificationCodeMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UserSendPhoneNumberVerificationCodeMutation,
  UserSendPhoneNumberVerificationCodeMutationVariables
>;

import { EntityManager } from "typeorm";

export enum UserType {
  Admin = "admin",
  Lister = "lister",
  Customer = "customer",
  SuperAdmin = "superAdmin",
  Manager = "manager",
  SellerAdmin = "sellerAdmin",
  SellerTester = "sellerTester",
  BuyerTester = "buyerTester",
}

export enum UserStatus {
  Enable = "enable",
  Disable = "disable",
}

export enum LivestreamEventType {
  FOCUS = "FOCUS",
  BID = "BID",
  HAMMER = "HAMMER",
  ANNOUNCEMENT = "ANNOUNCEMENT",
  SOLD = "SOLD",
}

export enum CognitoGroup {
  Admin = "Admin",
  Lister = "Lister",
  Customer = "Customer",
  SuperAdmin = "SuperAdmin",
  Manager = "Manager",
  SellerAdmin = "SellerAdmin",
  SellerTester = "SellerTester",
  BuyerTester = "BuyerTester",
}

export enum AuctionBlockedBy {
  None = "none",
  SuperAdmin = "superAdmin",
}

export enum AuctionType {
  All = "all",
  Live = "live",
  Closed = "closed",
  Upcoming = "upcoming",
  Archived = "archived",
}

export enum ProductQueryType {
  All = "all",
  Live = "live",
  Closed = "closed",
  Deleted = "deleted",
  Sold = "sold",
}

export enum TimeZone {
  US_CENTRAL = "US/Central",
}

export enum ProductStatus {
  Sold = "sold",
  Unsold = "unsold",
  Shipped = "shipped",
  Returned = "returned",
}

export enum CustomerAddressType {
  Billing = "billing",
  Shipping = "shipping",
}

export enum NotificationType {
  EMAIL = "email",
  CUSTOM_EMAIL = "customEmail",
  SMS = "sms",
  FCM = "fcm",
}

export enum BidderStatus {
  Approved = "approved",
  Rejected = "rejected",
  Pending = "pending",
  All = "all",
}

export enum OrderType {
  PRE_AUTH = "pre_auth",
  PRODUCT_WIN_ORDER = "product_win",
  PRODUCT_WIN_PICKUP = "product_win_pickup",
  PRODUCT_WIN_SHIPPING = "product_win_shipping",
  PRODUCT_SELL_NOW_PICKUP = "product_sellnow_pickup",
  PRODUCT_SELL_NOW_SHIPPING = "product_sellnow_shipping",
}

export enum ChargeType {
  PRE_AUTH = 1,
}

export enum SettingsType {
  payment = "payment",
  pickup = "pickup",
  shipping = "shipping",
  serviceCharge = "serviceCharge",
  platformFee = "platformFee",
  shippingTier = "shippingTier",
  sellerFee = "sellerFee",
  condition = "condition",
  fulfillment = "fulfillment",
}

export enum PaymentType {
  NONE = "none",
  OFFLPLATFORM = "offplatform",
  STRIPE = "stripe",
}

export enum FulfillmentStatus {
  PICKUP_REQUESTED = "pickup_requested",
  PICKED_UP = "picked_up",
  SHIPMENT_REQUEST = "shipment_requested",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
}

export enum ShipmentType {
  Shipping = "shipping",
  Pickup = "pickup",
}

export enum StripeAccDisabledReason {
  "action_required.requested_capabilities" = "One or more information is required to complete the account verification process.",
  "listed" = "Account might be on a prohibited persons or companies list (Stripe will investigate and either reject or reinstate the account appropriately)",
  "rejected.fraud" = "Account is rejected due to suspected fraud or illegal activity.",
  "rejected.incomplete_verification" = "The account is rejected from incomplete verification requirements within the required threshold.",
  "rejected.listed" = "Account is rejected because it’s on a third-party prohibited persons or companies list",
  "rejected.other" = "Account is rejected for another reason.",
  "rejected.terms_of_service" = "Account is rejected due to suspected terms of service violations.",
  "requirements.past_due" = "Additional verification information is required to enable capabilities on this account.",
  "requirements.pending_verification" = "Your Stripe verification is currently in progress. No action is needed.",
  "under_review" = "The account is under review by Stripe.",
}

export enum StripeAccOnboardingErrors {
  /** LIST OF ERRORS RELATED TO BUSINESS INFORMATION VERIFICATION  */
  "invalid_business_profile_name" = "Invalid business name provided.Business names must be easy for people to understand and must consist of recognisable words",
  "invalid_business_profile_name_denylisted" = "Generic or well-known business names aren’t supported. Make sure the provided business name matches the account’s business.",
  "invalid_product_description_length" = "A product description must be at least 10 characters.",
  "invalid_product_description_url_match" = "A product description must be different from the URL of the business.",

  /** LIST OF ERRORS RELATED TO STATEMENT DESCRIPTION VERIFICATION */
  "invalid_statement_descriptor_length" = "Change the provided statement descriptor. A statement descriptor must be at least 5 characters.",
  "invalid_statement_descriptor_business_mismatch" = "A statement descriptor must be similar to the business name, legal entity name, or URL of the account.",
  "invalid_statement_descriptor_denylisted" = "Generic or well-known statement descriptors aren’t supported.",
  "invalid_statement_descriptor_prefix_denylisted" = "Generic or well-known statement descriptors aren’t supported.",
  "invalid_statement_descriptor_prefix_mismatch" = "The statement descriptor prefix must be similar to the full statement descriptor.",

  /** LIST OF ERRORS RELATED TO PERSON VERIFICATION */
  "invalid_address_city_state_postal_code" = "Stripe couldn’t validate the combination of the city, state, and postal code in the provided address.",
  "invalid_address_highway_contract_box" = "The provided address of the person must be a valid physical address from which the account conducts business and cannot be a Highway Contract Box.",
  "invalid_address_private_mailbox" = "The provided address of the person must be a valid physical address from which the account conducts business and cannot be a private mailbox.",
  "invalid_dob_age_under_minimum" = "The person must be at least 13 years old.",
  "invalid_dob_age_over_maximum" = "The person’s date of birth must be within the past 120 years.",
  "invalid_phone_number" = "Stripe couldn’t validate the phone number on the account. Make sure the formatting matches the country of the person.",
  "invalid_street_address" = "Stripe couldn’t validate the street name and/or number for the provided address.",
  "invalid_tax_id" = "Tax IDs must be a unique set of 9 numbers without dashes or other special characters.",
  "invalid_tax_id_format" = "Tax IDs must be a unique set of 9 numbers without dashes or other special characters.",

  /** LIST OF ERRORS RELATED TO DOCUMENT UPLOAD */
  "verification_document_corrupt" = "The uploaded document provided for verification failed due to a problem with the file itself. Please upload a different document file to complete the verification",
  "verification_document_failed_copy" = "The uploaded document provided for verification failed due to a problem with the file itself. Please upload a different document file to complete the verification",
  "verification_document_failed_greyscale" = "The uploaded document provided for verification failed due to a problem with the file itself. Please upload a different document file to complete the verification",
  "verification_document_incomplete" = "The uploaded document provided for verification failed due to a problem with the file itself. Please upload a different document file to complete the verification",
  "verification_document_not_readable" = "The uploaded document provided for verification failed due to a problem with the file itself. Please upload a different document file to complete the verification",
  "verification_document_not_uploaded" = "The uploaded document provided for verification failed due to a problem with the file itself. Please upload a different document file to complete the verification",
  "verification_document_not_signed" = "The uploaded document provided for verification failed due to a problem with the file itself. Please upload a different document file to complete the verification",
  "verification_document_missing_front" = "The uploaded document provided for verification failed due to a problem with the file itself. Please upload a different document file to complete the verification",
  "verification_document_too_large" = "The uploaded document provided for verification failed due to a problem with the file itself. Please upload a different document file to complete the verification",
  "verification_document_country_not_supported" = "The provided file is not an acceptable form of ID from a supported country, or is not a type of legal entity document that is expected. Provide a new file that meets the requirement.",
  "verification_document_invalid" = "The provided file is not an acceptable form of ID from a supported country, or is not a type of legal entity document that is expected. Provide a new file that meets the requirement.",
  "verification_document_type_not_supported" = "The provided file is not an acceptable form of ID from a supported country, or is not a type of legal entity document that is expected. Provide a new file that meets the requirement.",
  "verification_failed_other" = "Idendity verification failed from stripe. To learn more about, Contact Vendidit team ",
  "verification_document_failed_other" = "Idendity verification failed from stripe. To learn more about, Contact Vendidit team ",
  "verification_document_expired" = "The issue or expiry date is missing on the document, or the document is expired. If it’s an identity document, its expiration date must be after the date the document was submitted. If it’s an address document, the issue date must be within the last six months.",
  "verification_document_issue_or_expiry_date_missing" = "The issue or expiry date is missing on the document, or the document is expired. If it’s an identity document, its expiration date must be after the date the document was submitted. If it’s an address document, the issue date must be within the last six months.",

  /** LIST OF ERRORS RELATED TO IDENDITY VERIFICATION */
  "verification_failed_keyed_identity" = "The name on the account couldn’t be verified. Please provide the full legal name and a photo ID matching that name",
  "verification_document_dob_mismatch" = "The information on the ID document doesn’t match the information provided by the user. Verify and correct the provided information on the account.",
  "verification_document_address_mismatch" = "The information on the ID document doesn’t match the information provided by the user. Verify and correct the provided information on the account.",
  "verification_document_id_number_mismatch" = "The information on the ID document doesn’t match the information provided by the user. Verify and correct the provided information on the account.",
  "verification_document_photo_mismatch" = "The information on the ID document doesn’t match the information provided by the user. Verify and correct the provided information on the account.",
  "verification_document_fraudulent" = "The provided document might have been altered so it could not be verified. Please contact team Vendidit to learn more about this issue",
  "verification_document_manipulated" = "The provided document might have been altered so it could not be verified. Please contact team Vendidit to learn more about this issue",

  /** LIST OF ERRORS RELATED TO BUSINESS VERIFICATION */
  "verification_failed_keyed_match" = "The information on the account couldn’t be verified. Either upload a document to confirm the account details, or update the information on the stripe account",
  "verification_failed_document_match" = "The information on the account couldn’t be verified. Either upload a document to confirm the account details, or update the information on the stripe account",
  "verification_failed_tax_id_not_issued" = "The provided information couldn’t be verified with the IRS. Correct any possible errors in the company name or tax ID, or upload a document that contains those fields. (US only)",
  "verification_failed_tax_id_match" = "The provided information couldn’t be verified with the IRS. Correct any possible errors in the company name or tax ID, or upload a document that contains those fields. (US only)",
  "verification_failed_id_number_match" = "The information on the provided document doesn’t match the provided information. Update the provided information on the account, or upload a document with information that matches the account.",
  "verification_failed_name_match" = "The information on the provided document doesn’t match the provided information. Update the provided information on the account, or upload a document with information that matches the account.",
  "verification_failed_address_match" = "The information on the provided document doesn’t match the provided information. Update the provided information on the account, or upload a document with information that matches the account.",
  "verification_document_address_missing" = "The uploaded document is missing a required field. Upload another document that contains the missing field.",
  "verification_document_id_number_missing" = "The uploaded document is missing a required field. Upload another document that contains the missing field.",
  "verification_document_name_missing" = "The uploaded document is missing a required field. Upload another document that contains the missing field.",
}

export enum PaymentStatus {
  WAITING_FOR_PAYMENT = "waiting_for_payment",
  PAID = "paid",
  FAILED = "failed",
}

export enum PaymentManagementStatus {
  WAITING_FOR_ORDER_GENERATION = "Waiting for order generation",
  NEEDS_INVOICE = "Needs Invoice",
  INVOICE_IS_GETTING_READY = "Invoice is getting ready",
  WAITING_FOR_PAYMENT = "Awaiting Payment",
  PAID = "Paid in Full",
  FAILED = "Payment Failed",
  MARK_ORDER_PAID_ERROR = "Error in marking order as paid",
}

export enum TransactionStatus {
  ERROR = "transaction_error",
  UNSETTLED = "unsettled",
  PAYMENT_SUCCESS = "payment_success",
  PAYMENT_DECLINED = "payment_declined",
}

export enum AuthorizeTransactionStatus {
  authorizedPendingCapture = "authorizedPendingCapture",
  capturedPendingSettlement = "capturedPendingSettlement",
  communicationError = "communicationError",
  refundSettledSuccessfully = "refundSettledSuccessfully",
  refundPendingSettlement = "refundPendingSettlement",
  approvedReview = "approvedReview",
  declined = "declined",
  couldNotVoid = "couldNotVoid",
  expired = "expired",
  generalError = "generalError",
  failedReview = "failedReview",
  settledSuccessfully = "settledSuccessfully",
  settlementError = "settlementError",
  underReview = "underReview",
  voided = "voided",
  FDSPendingReview = "FDSPendingReview",
  FDSAuthorizedPendingReview = "FDSAuthorizedPendingReview",
  returnedItem = "returnedItem",
}

export enum TransactionType {
  AUTHORIZE_TRANSACTION = "authorize",
  CUSTOMER_MADE_TRANSACTION = "customer_made_transaction",
}

export enum ProductPaymentStatus {
  Unpaid = "Unpaid",
  Paid = "Paid",
}

export enum ProductShipmentStatus {
  Unshipped = "Unshipped",
  Requested = "Requested",
  Processing = "Processing",
  Ongoing = "Ongoing",
  Completed = "Completed",
  Canceled = "Canceled",
  Returned = "Returned",
  Delivered = "Delivered",
}

export enum FcmType {
  BidIncrement = "bidIncrement",
  ProductWin = "productWin",
}
export enum EmailTemplateType {
  AuctionRegistration = "AuctionRegistration",
  BuyerRegistrationApproved = "BuyerRegistrationApproved",
  BuyerRegistrationRejected = "BuyerRegistrationRejected",
  SellerVerificationEmail = "SellerVerificationEmail",
  ListerInvitationEmail = "ListerInvitationEmail",
  LiveAuctionEmail = "LiveAuctionEmail",
  ClosedAuctionEmail = "ClosedAuctionEmail",
  ApprovedAuctionEmail = "ApprovedAuctionEmail",
  OfferAccepted = "OfferAccepted",
  OfferRejected = "OfferRejected",
  AuctionDeleted = "AuctionDeleted",
  ListingDeleted = "ListingDeleted",
  ListingUpdated = "ListingUpdated",
  ItemWonEmail = "ItemWonEmail",
  OutbidEmail = "OutbidEmail",
  FollowSellerEmail = "FollowSellerEmail",
  NotifySellerBeforeAuctionGoLive = "NotifySellerBeforeAuctionGoLive",
  NoPaymentInformCx = "NoPaymentInformCx",
  NoPaymentInformSeller = "NoPaymentInformSeller",
  InvoiceAddedNotifyBuyer = "InvoiceAddedNotifyBuyer",
  WishlistNotification = "WishlistNotification",
  LiveStreamScheduledNotifyBuyer = "LiveStreamScheduledNotifyBuyer",
  LiveStreamStartedNotifyBuyer = "LiveStreamStartedNotifyBuyer",
  LiveStreamNotStartedNotifySeller = "LiveStreamNotStartedNotifySeller",
  LiveStreamAuctionGoesLiveEmail = "LiveStreamAuctionGoesLiveEmail",
}

export enum BulkProductStatus {
  VALIDATION_SUCCESS = "validationSuccess",
  VALIDATION_ERROR = "validationError",
}

export enum BulkProductMoveToAuctionType {
  ALL = "all",
  MULTIPLE = "multiple",
}

export enum ExcelProcessStatus {
  UPLOADED = "uploaded",
  VALIDATION_SUCCESS = "validationSuccess",
  VALIDATION_ERROR = "validationError",
  PROCESSED = "processed",
  ERROR = "error",
}

export enum UploadImageType {
  Logo = "logo",
  Banner = "banner",
  FavIcon = "favIcon",
}
export enum CustomerContactType {
  Registered = "Registered",
  Unregistered = "Unregistered",
}

export enum SellerProfileDocumentType {
  About = "about",
  Faq = "faq",
  TermsAndCondition = "termsAndCondition",
  purchaseCondition = "purchaseCondition",
}

export enum BestOfferStatus {
  Approved = "Approved",
  Rejected = "Rejected",
  Pending = "Pending",
}

export enum OrderItemType {
  PRE_AUTH = "pre_auth",
  PRODUCT = "product",
  PLATFORM_FEE = "platform_fee",
  SHIPPING_FEE = "shipping_fee",
  SELLER_FEE = "seller_fee",
}

export enum PackageType {
  PALLETS = "pallets",
  SINGLE_UNITS = "singleUnits",
  TRUCKS = "trucks",
  OTHER = "other",
  None = "",
}

export enum BestOfferReqType {
  ProductIds = "ProductIds",
  HighestAll = "HighestAll",
  BestOfferIds = "BestOfferIds",
  HighestMetAll = "HighestMetAll",
}

export enum ProductStatusQuery {
  All = "all",
  Sold = "sold",
  Unsold = "unsold",
  Pending = "pending",
}

export enum StartingBidType {
  All = "all",
  Met = "met",
  NotMet = "notmet",
}

export enum ReleaseRequestType {
  All = "All",
  ProductIds = "ProductIds",
}

export enum FulfillmentType {
  SHIPPING = "shipping",
  PICKUP = "pickup",
  PICKUP_AND_SHIPMENT = "pickup&shipping",
}

export enum AuctionFilterType {
  PUBLIC = "public",
  PRIVATE = "private",
  ALL = "all",
}

export enum AuctionFilterBidType {
  OPEN = "open",
  BLIND = "blind",
  ALL = "all",
}

export enum CustomerBidStatus {
  WON = "won",
  LOST = "lost",
  WINNING = "winning",
  OUTBID = "outbid",
  ALL = "all",
}

export enum PostHogGroupType {
  Seller = "seller",
  Auction = "auction",
  Lister = "lister",
}
export enum SampleFileDownloadType {
  CSV = "csv",
  XLSX = "xlsx",
}
export enum PostHogEventType {
  NetworkResponse = "network_response",
  ErrorResponse = "error_response",
}

export enum BidderFilterType {
  All = "all",
  Approved = "approved",
  Denied = "denied",
  Requested = "requested",
  PreApproved = "preApproved",
}

export enum BidderRegistrationStatus {
  Approved = "approved",
  Denied = "denied",
  Requested = "requested",
  PreApproved = "preApproved",
}

export enum CrmContactType {
  All = "all",
  NoAccount = "noAccount",
  Confirm = "confirm",
  Invited = "invited",
  Locked = "locked",
}

export enum ReceivingOptions {
  PICKUP = "PICKUP",
  SHIPPING = "SHIPPING",
}

export enum OrderProgressStatus {
  ITEM_WON = "item_won",
  PICKUP_PLAN_NEEDED = "pickup_plan_needed",
  PIKCUP_ARRANGED = "pickup_aranged",
  SHIPPING_ADDRESS_REVIEW = "review_shipping_address",
  SHIPPING_ADDRESS_CONFIRMED = "shipping_address_confirmed",
  PAYMENT_REQUIRED = "payment_required",
  PAID = "paid",
  AWAITING_PICKUP = "awaiting_pickup",
  PICKED_UP = "picked_up",
  AWAITING_SHIPPING = "awaiting_shipping",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
}
export enum GenerateFileType {
  CSV = "csv",
  XLSX = "xlsx",
}

/** AWS SCHEDULER TYPES */
export enum SchedulerTypes {
  PRODUCT_WINNER = "PRODUCT_WINNER",
  NOTIFY_SELLER_BEFORE_AUCTION_GO_LIVE = "NOTIFY_SELLER_BEFORE_AUCTION_GO_LIVE",
  AUCTION_MAKE_LIVE = "AUCTION_MAKE_LIVE",
  WISHLIST_NOTIFICATION = "WISHLIST_NOTIFICATION",
  NOTIFY_SELLER_AFTER_DELAYING_LIVESTREAM = "NOTIFY_SELLER_AFTER_DELAYING_LIVESTREAM",
}

export type ValidationResult = {
  isValid: boolean;
  message: string;
  validatedData?: string;
};

export enum OrderProgressFilterStatus {
  PAYMENT_REQUIRED = "payment_required",
  PICKUP_PLAN_NEEDED = "pickup_plan_needed",
  AWAITING_PICKUP = "awaiting_pickup",
  PICKED_UP = "picked_up",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  SHIPPING_ADDRESS_REVIEW = "review_shipping_address",
  AWAITING_SHIPPING = "awaiting_shipping",
  ALL = "all",
}

export type SchedulerInputData =
  | {
      eventType: SchedulerTypes.PRODUCT_WINNER;
      auctionId: number;
      order: number;
    }
  | {
      eventType: SchedulerTypes.WISHLIST_NOTIFICATION;
      auctionId: number;
    }
  | ({
      eventType:
        | SchedulerTypes.AUCTION_MAKE_LIVE
        | SchedulerTypes.NOTIFY_SELLER_BEFORE_AUCTION_GO_LIVE
        | SchedulerTypes.NOTIFY_SELLER_AFTER_DELAYING_LIVESTREAM;
      id: number;
    } & Record<string, any>);

export type FetchLastProductParam = {
  auctionId: number;
  productId?: number;
  entityManager?: EntityManager;
};

export type HundredMsRoomCodeResponse = {
  id: string;
  code: string;
  room_id: string;
  role: string;
  enabled: boolean;
  created_at: Date;
  updated_at: Date;
};

export type Paginate<T extends Record<any, any>> = T & {
  total: number;
};

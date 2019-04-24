export class Columns {
    public static matterColumns: any = ['SHORTNAME', 'MATTER', 'CONTACTNAME', 'CONTACTFIRMNAME', 'MATTERCLASS', 'MATTERTYPE', 'CLIENT', 'REFERENCE',
        'UNBILLED', 'INVOICED', 'RECEIVED', 'WRITTENOFF', 'OUTSTANDING', 'TOTALVALUE', 'UNPAID', 'ESTIMATE', 'RATEPERHOUR', 'RATEPERDAY', 'FEEAGREEMENTDATE',
        'BILLINGMETHOD', 'GSTTYPE', 'CLIENTSTATUS', 'MATTERNO', 'ACTIVE'];
    public static contactColumns: any = ['COMPANYCONTACTGUID', 'CONTACTTYPE', 'USERGUID', 'USEPARENTADDRESS', 'CONTACTNAME', 'SALUTATION', 'POSITION', 'NAMETITLE',
        'GIVENNAMES', 'MIDDLENAMES', 'FAMILYNAME', 'NAMELETTERS', 'KNOWNBYOTHERNAME', 'OTHERFAMILYNAME', 'OTHERGIVENNAMES', 'REASONFORCHANGE', 'MARITALSTATUS',
        'SPOUSE', 'NUMBEROFDEPENDANTS', 'OCCUPATION', 'GENDER', 'DATEOFBIRTH', 'BIRTHDAYREMINDER', 'TOWNOFBIRTH', 'COUNTRYOFBIRTH', 'CAUSEOFDEATH', 'ADDRESS1'
        , 'ADDRESS1', 'ADDRESS2', 'ADDRESS3', 'SUBURB', 'STATE', 'POSTCODE', 'COUNTRY', 'SAMEASSTREET', 'POSTALADDRESS1', 'POSTALADDRESS2', 'POSTALADDRESS3',
        'POSTALSUBURB', 'POSTALSTATE', 'POSTALPOSTCODE', 'POSTALCOUNTRY', 'DX', 'DXSUBURB', 'PHONE', 'PHONE2', 'FAX', 'FAX2', 'MOBILE', 'EMAIL', 'EMAIL2',
        'ELECTRONICSERVICEEMAIL', 'WEBADDRESS', 'SKYPEUSERNAME', 'MESSENGERUSERNAME', 'ACN', 'ABN', 'PRACTICINGCERTIFICATENO', 'TFN', 'LICENCENO', 'LICENCECOUNTRY',
        'LICENCESCANLOCATION', 'NATIONALIDENTITYNO', 'NATIONALIDENTITYCOUNTRY', 'NATIDENTSCANLOCATION', 'FAMILYCOURTLAWYERNO', 'ASSOCIATIONNO', 'GSTTYPE',
        'DEFAULTCURRENCYID', 'PHOTOGRAPH', 'NOTES', 'ACTIVE', 'SOPHISTICATEDCLIENT', 'CLIENTSOURCE', 'COMPANYNAME'];
    public static WorkItemsColumns: any = ['MATTERGUID', 'INVOICEGUID', 'INVOICEORDER', 'ITEMTYPE', 'ITEMDATE', 'ITEMTIME', 'FEEEARNER', 'FEETYPE', 'QUANTITY', 'QUANTITYTYPE',
        'FORMATTEDQUANTITY', 'PRICE', 'GST', 'GSTTYPE', 'PRICEINCGST', 'GSTCHARGED', 'PRICECHARGED', 'PRICEINCGSTCHARGED', 'ADDITIONALTEXT', 'COMMENT', 'SHORTNAME',
        'INVOICECODE', 'CLIENTNAME'];
    public static workInProgressColumns: any = ['MATTERGUID', 'INVOICEGUID', 'INVOICEORDER', 'ITEMTYPE', 'ITEMDATE', 'ITEMTIME', 'FEEEARNER', 'FEETYPE', 'QUANTITY', 'QUANTITYTYPE',
        'FORMATTEDQUANTITY', 'PRICE', 'GST', 'GSTTYPE', 'PRICEINCGST', 'GSTCHARGED', 'PRICECHARGED', 'PRICEINCGSTCHARGED', 'ADDITIONALTEXT', 'COMMENT', 'SHORTNAME', 'INVOICECODE',
        'CLIENTNAME'];
    public static invoicesColumns: any = ['INVOICEREVERSALGUID', 'MATTERGUID', 'SHORTNAME', 'CLIENTNAME', 'PARENTINVOICEGUID', 'INVOICECODE', 'INVOICEDATE',
        'DUEDATE', 'PRINTEDDATE', 'INVOICETOTAL', 'GST', 'AGENCYTOTAL', 'AGENCYGST', 'AMOUNTPAIDEXGST', 'AMOUNTPAIDINCGST', 'AMOUNTWRITTENOFFEXGST',
        'AMOUNTWRITTENOFFINCGST', 'AMOUNTOUTSTANDINGEXGST', 'AMOUNTOUTSTANDINGINCGST', 'DISBURSEMENTAMOUNTEXGST', 'DISBURSEMENTAMOUNTINCGST', 'FOREIGNCURRENCYID',
        'FOREIGNCURRENCYRATE', 'FOREIGNCURRENCYAMOUNT', 'FOREIGNCURRENCYGST', 'COMMENT'];
    public static MatterReceiptsColumns: any = ['INCOMECODE', 'INVOICECODE', 'INCOMEGUID', 'INCOMECLASS', 'INCOMETYPE', 'FIRMGUID', 'SHORTNAME', 'CLIENTNAME', 'ALLOCATION'
        , 'INCOMEDATE', 'PAYEE', 'AMOUNT', 'GST', 'TOTAL', 'BANKACCOUNTGUID', 'INCOMEACCOUNTGUID', 'NOTE', 'GSTTYPE'];
    public static MatterTrustColumns: any = ['TRUSTTRANSACTIONITEMGUID', 'TRUSTTRANSACTIONGUID', 'ENTEREDDATE', 'ENTEREDTIME', 'AMOUNT', 'ITEMTYPE', 'ACCOUNTGUID',
        'MATTERGUID', 'SHORTNAME', 'MATTERDESCRIPTION', 'CLIENTGUID', 'CLIENTNAME', 'BANKBSB', 'BANKACCOUNTNUMBER', 'LEDGERBALANCE',
        'PURPOSE', 'TRANSACTIONCLASS', 'TRANSACTIONTYPE', 'CASHBOOK', 'CASHBOOKCODE', 'TRANSACTIONDATE', 'DATEENTERED', 'PAYOR', 'CHEQUENO', 'CONTACTNAME'];
    public static EstimatesItemsColumns: any = ['ESTIMATEITEMGUID', 'ESTIMATEGUID', 'WORKITEMGUID', 'MATTERGUID', 'ITEMTYPE', 'FEEEARNER', 'FEETYPE', 'ORDER',
        'QUANTITYFROM', 'QUANTITYTYPEFROM', 'FORMATTEDQUANTITYFROM', 'PRICEFROM', 'GSTFROM', 'PRICEINCGSTFROM', 'QUANTITYTO', 'QUANTITYTYPETO', 'FORMATTEDQUANTITYTO',
        'PRICETO', 'GSTTO', 'PRICEINCGSTTO', 'SERVICE', 'SHORTNAME', 'CLIENTNAME'];
    public static fileNoteColumns: any = ['FILENOTEGUID', 'MATTERGUID', 'USERNAME', 'DATE_', 'TIME_', 'NOTE', 'SHORTNAME', 'CONTACTNAME'];
    public static safeCustodyColumns: any = ['SAFECUSTODYGUID', 'SAFECUSTODYPACKETGUID', 'MATTERGUID', 'CONTACTGUID', 'DOCUMENTTYPE', 'SAFECUSTODYDESCRIPTION',
        'DOCUMENTNAME', 'STATUS', 'REMINDER', 'REMINDERDATE', 'REMINDERTIME', 'ADDITIONALTEXT', 'SHORTNAME', 'CONTACTNAME', 'PACKETNUMBER'];
    public static chronologyColumns: any = ['MATTERGUID', 'CHRONOLOGYGUID', 'DATEFROM', 'DATETO', 'TIMEFROM', 'TIMETO', 'FORMAT', 'FORMATTEDDATE', 'TOPIC',
        'PRIVILEGED', 'BRIEFPAGENO', 'REFERENCE', 'COMMENT', 'WITNESSES', 'EVENTAGREED', 'DOCUMENTNAME', 'ADDITIONALTEXT', 'SHORTNAME', 'CLIENTNAME'];
    public static authoritiesColumns: any = ['MATTERAUTHORITYGUID', 'MATTERGUID', 'AUTHORITYGUID', 'AUTHORITY', 'CITATION', 'WEBADDRESS', 'TOPIC', 'REFERENCE', 'COMMENT'
        , 'SHORTNAME', 'CLIENTNAME'];
}
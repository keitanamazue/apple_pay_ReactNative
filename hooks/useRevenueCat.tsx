import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import Purchases, {
  CustomerInfo,
  PurchasesOffering,
} from "react-native-purchases";

const APIKeys = {
  apple: "appl_qtlibJABxecTLhivVynyqYJzzmk",
  google: "your_revenuecat_google_api_key",
};

function useRevenueCat() {
  const [currentOffering, setCurrentOffering] =
    useState<PurchasesOffering | null>(null);

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);

  const isProMember =
    customerInfo?.activeSubscriptions.includes("basic") ||
    customerInfo?.activeSubscriptions.includes("pro");

  useEffect(() => {
    const fetchData = async () => {
      Purchases.setDebugLogsEnabled(true);

      if (Platform.OS == "android") {
        await Purchases.configure({ apiKey: APIKeys.google });
      } else {
        await Purchases.configure({ apiKey: APIKeys.apple });
      }

      const offerings = await Purchases.getOfferings();
      const customerInfo = await Purchases.getCustomerInfo();

      console.log({offerings});
      

      setCustomerInfo(customerInfo);
      setCurrentOffering(offerings.current);
    };

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const customerInfoUpdated = async (purchaserInfo: CustomerInfo) => {
      setCustomerInfo(purchaserInfo);
    };

    Purchases.addCustomerInfoUpdateListener(customerInfoUpdated);
  }, []);

  return { currentOffering, customerInfo, isProMember };
}

export default useRevenueCat;

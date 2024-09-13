import {
  useGetAllMedicalReqUsersQuery,
  useGetAverageResponseTimeQuery,
} from "@/redux/apis/medical_req/medicalReqApi";
import { RequirementTypeEnum } from "../../../../../../apps/api/src/medical_req/enums/requirement_type.enum";
import { RequirementStatusEnum } from "../../../../../../apps/api/src/medical_req/enums/requirement_status.enum";
import { UserRolType } from "../../../../../../apps/api/src/utils/enums/user_roles.enum";

export const useMedicalReqData = (year?: number, month?: number) => {
  const {
    data: allMedicalReqData,
    isLoading: isLoadingAllByDate,
    isFetching: isFetchingAllByDate,
  } = useGetAllMedicalReqUsersQuery({
    year,
    month,
  });

  return { allMedicalReqData, isLoadingAllByDate, isFetchingAllByDate };
};

export const useMedicalReqDataByType = (year?: number, month?: number) => {
  const {
    data: clinicHistoryData,
    isLoading: isLoadingClinicHistory,
    isFetching: isFetchingClinicHistory,
  } = useGetAllMedicalReqUsersQuery({
    type: RequirementTypeEnum.CLINIC_HISTORY,
    year,
    month,
  });

  const {
    data: medicalDisabilityData,
    isLoading: isLoadingMedicalDisability,
    isFetching: isFetchingMedicalDisability,
  } = useGetAllMedicalReqUsersQuery({
    type: RequirementTypeEnum.MEDICAL_DISABILITY,
    year,
    month,
  });

  const {
    data: medicalOrderData,
    isLoading: isLoadingMedicalOrder,
    isFetching: isFetchingMedicalOrder,
  } = useGetAllMedicalReqUsersQuery({
    type: RequirementTypeEnum.MEDICAL_ORDER,
    year,
    month,
  });

  return {
    clinicHistoryData,
    isLoadingClinicHistory,
    isFetchingClinicHistory,
    medicalDisabilityData,
    isLoadingMedicalDisability,
    isFetchingMedicalDisability,
    medicalOrderData,
    isLoadingMedicalOrder,
    isFetchingMedicalOrder,
  };
};

export const useMedicalReqDataByStatus = (year?: number, month?: number) => {
  const {
    data: createdData,
    isLoading: isLoadingCreatedRequests,
    isFetching: isFetchingCreatedRequests,
  } = useGetAllMedicalReqUsersQuery({
    status: RequirementStatusEnum.CREATED,
    year,
    month,
  });

  const {
    data: visualizedData,
    isLoading: isLoadingVisualizedRequests,
    isFetching: isFetchingVisualizedRequests,
  } = useGetAllMedicalReqUsersQuery({
    status: RequirementStatusEnum.VISUALIZED,
    year,
    month,
  });

  const {
    data: underReviewData,
    isLoading: isLoadingUnderReviewRequests,
    isFetching: isFetchingUnderReviewRequests,
  } = useGetAllMedicalReqUsersQuery({
    status: RequirementStatusEnum.UNDER_REVIEW,
    year,
    month,
  });

  const {
    data: deliveredData,
    isLoading: isLoadingDeliveredRequests,
    isFetching: isFetchingDeliveredRequests,
  } = useGetAllMedicalReqUsersQuery({
    status: RequirementStatusEnum.DELIVERED,
    year,
    month,
  });

  const {
    data: rejectedData,
    isLoading: isLoadingRejectedRequests,
    isFetching: isFetchingRejectedRequests,
  } = useGetAllMedicalReqUsersQuery({
    status: RequirementStatusEnum.REJECTED,
    year,
    month,
  });

  const {
    data: expiredData,
    isLoading: isLoadingExpiredRequests,
    isFetching: isFetchingExpiredRequests,
  } = useGetAllMedicalReqUsersQuery({
    status: RequirementStatusEnum.EXPIRED,
    year,
    month,
  });

  return {
    createdData,
    isLoadingCreatedRequests,
    isFetchingCreatedRequests,
    visualizedData,
    isLoadingVisualizedRequests,
    isFetchingVisualizedRequests,
    underReviewData,
    isLoadingUnderReviewRequests,
    isFetchingUnderReviewRequests,
    deliveredData,
    isLoadingDeliveredRequests,
    isFetchingDeliveredRequests,
    rejectedData,
    isLoadingRejectedRequests,
    isFetchingRejectedRequests,
    expiredData,
    isLoadingExpiredRequests,
    isFetchingExpiredRequests,
  };
};

export const useMedicalReqDataByApplicantType = (
  year?: number,
  month?: number
) => {
  const {
    data: patientData,
    isLoading: isLoadingPatientTypeRequests,
    isFetching: isFetchingPatientTypeRequests,
  } = useGetAllMedicalReqUsersQuery({
    aplicantType: UserRolType.PATIENT,
    year,
    month,
  });

  const {
    data: epsData,
    isLoading: isLoadingEpsTypeRequests,
    isFetching: isFetchingEpsTypeRequests,
  } = useGetAllMedicalReqUsersQuery({
    aplicantType: UserRolType.EPS,
    year,
    month,
  });

  const {
    data: familiarData,
    isLoading: isLoadingFamiliarTypeRequests,
    isFetching: isFetchingFamiliarTypeRequests,
  } = useGetAllMedicalReqUsersQuery({
    aplicantType: UserRolType.AUTHORIZED_FAMILIAR,
    year,
    month,
  });

  return {
    patientData,
    isLoadingPatientTypeRequests,
    isFetchingPatientTypeRequests,
    epsData,
    isLoadingEpsTypeRequests,
    isFetchingEpsTypeRequests,
    familiarData,
    isLoadingFamiliarTypeRequests,
    isFetchingFamiliarTypeRequests,
  };
};

export const useGetAverageResponseTimeData = () => {
  const { data: averageResponseTime } = useGetAverageResponseTimeQuery(null);

  return { averageResponseTime };
};

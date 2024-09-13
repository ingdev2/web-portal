interface UpdateStatusMedicalReq {
  requirement_status: number;
  response_comments: string;
  motive_for_rejection: number[];
  documents_delivered: string[];
  answer_date: Date;
  response_time: string;
  download_expiration_date: Date;
  is_it_reviewed: boolean;
  currently_in_area: number;
  area_redirection_message: string;
}

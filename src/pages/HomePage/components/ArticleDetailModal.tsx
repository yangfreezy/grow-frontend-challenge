import React, { useState, useEffect, useCallback } from 'react';
import { AxiosResponse } from 'axios';
import moment from 'moment';
import _ from 'lodash';
import { Typography, Modal, Box, Link } from '@mui/material';
import getResource from '../../../api/getResource';
import { getWikiTextUrl, makeArticleTitleReadable, getTopDaysOfMonthUrl } from "../../../utils/wiki";

const resultsFilterContainerStyles = {
    display: 'flex', alignItems: 'center', marginBottom: 2, justifyContent: 'center'
};

type ArticleDetailModalProps = {
  articleTitle: string | null,
  modalOpen: boolean,
  onClose: () => void,
}

const modalContainerStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
}

const ArticleDetailModal = ({ articleTitle, modalOpen, onClose } : ArticleDetailModalProps) => {
    const [summary, setSummary] = useState<string | null>(null);
    const [top3DaysText, setTop3DaysText] = useState<string[] | null>(null);
    const [top3DaysError, setTop3DaysError] = useState<boolean>(false);
  
    const fetchWikiResultsDetails = useCallback(() => {
      if (!articleTitle) return null;

      const handleSuccess = (res: AxiosResponse) => {
        const { data: { extract } } = res;
        if (extract.length === 0) setSummary('Summary unavailable for this article.')
        else setSummary(extract)
      }

      const handleError = (e: unknown) => {
        setSummary('Summary unavailable for this article.')
        console.error(e);
      }

      const url = getWikiTextUrl(articleTitle);
      getResource({
        url,
        onError: handleError,
        onSuccess: handleSuccess,
      })
    }, [articleTitle])

    const fetchTop3DaysThisMonth = useCallback(async () => {
      if (!articleTitle) return null;

      const url = getTopDaysOfMonthUrl(articleTitle);

      const handleSuccess = (res: AxiosResponse) => {
        const { data: { items } } = res;
        const top3DatesRaw = _.orderBy(items, 'views', 'desc').slice(0,3)
        const top3 = top3DatesRaw.map(result => {
          const timestamp = result.timestamp.slice(0, -2);
          const readableDate = moment(timestamp, "YYYYMMDD").format('MMMM Do YYYY');
          return readableDate;
        })
  
        const number1 = top3[0] || 'N/A';
        const number2 = top3[1] || 'N/A';
        const number3 = top3[2] || 'N/A';
        setTop3DaysError(false);
        setTop3DaysText([number1, number2, number3]);
      };

      const handleError = (e: unknown) => {
        console.error(e);
        setTop3DaysError(true);
        setTop3DaysText(null);
      };

      getResource({
        url,
        onError: handleError,
        onSuccess: handleSuccess,
      })
    },[articleTitle]);
    
    useEffect(() => {
      fetchWikiResultsDetails();
      fetchTop3DaysThisMonth();
    }, [articleTitle]);

    if (!articleTitle) return null;

    const modalTextSpacing = {
      marginBottom: 2,
    }

    return (
        <>
          <Modal
            open={modalOpen}
            onClose={onClose}
            data-testid="ArticleDetailModal"
            sx={resultsFilterContainerStyles}
          >
            <Box sx={modalContainerStyles}>
              <Typography variant="h6" sx={modalTextSpacing}>
                Title
              </Typography>
              <Typography sx={modalTextSpacing}>
                {makeArticleTitleReadable(articleTitle)}
              </Typography>
              <Typography variant="h6" sx={modalTextSpacing}>
                Preview
              </Typography>
              <Typography sx={modalTextSpacing}>
                {summary}
              </Typography>
              <Typography variant="h6" sx={modalTextSpacing}>
                Most Viewed Days This Month
              </Typography>
              {
                top3DaysText ? (
                  <>
                    <Typography sx={modalTextSpacing}>
                      1. {top3DaysText[0]}
                    </Typography>
                    <Typography sx={modalTextSpacing}>
                      2. {top3DaysText[1]}
                    </Typography>
                    <Typography sx={modalTextSpacing}>
                      3. {top3DaysText[2]}
                    </Typography>
                  </>
                ) : null
              }
              {
                top3DaysError && !top3DaysText ? (
                  <Typography sx={modalTextSpacing}>
                    Something went wrong.
                  </Typography>
                ) : null
              }
              <Link
                color="inherit"
                target="_blank"
                href={`https://en.wikipedia.org/wiki/${articleTitle}`}>
                <Typography sx={modalTextSpacing}>
                  View Page
                </Typography>
              </Link>
            </Box>
          </Modal>
        </>
    );
};

export default ArticleDetailModal;

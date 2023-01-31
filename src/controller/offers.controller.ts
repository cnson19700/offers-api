import { OfferService } from './../services'
import { Constants } from '../constants/constants';
import { Offers } from '../models';
import readlineSync from 'readline-sync';
import { TimeDate } from './../utils'

// Call Offer Service
let offerService = new OfferService();
let constants = new Constants();
let timeDateUtils = new TimeDate();

offerService.getOffersReqList().then(data => {
    try {

        const checkinDateString = readlineSync.question(constants.checkinDateQuestion);

        if (!timeDateUtils.dateIsValid(checkinDateString)) {
            throw new Error(constants.checkinDateWrongFormat);
        }

        let validOffers = offerService.getValidOffers(checkinDateString, data);

        if (validOffers.length == 0) {
            console.log(constants.checkinDateNoValidOffers);
            return;
        }
        console.log(JSON.stringify({ offers: validOffers }, null, 4));
    }
    catch (error) {
        if (error instanceof Error) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
});

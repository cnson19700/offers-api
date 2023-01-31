import { Offers } from './../models';
import axios from 'axios';
import { TimeDate } from './../utils'
import { Constants } from '../constants/constants';

export { };

const offerConstants = Object.freeze({
  maxValidCheckinDate: 5,
})

export class OfferService {
  // Public Methods
  constants = new Constants();

  public getValidOffers(checkinDateString: string, offers: Offers[]) {
    // Declare variables
    let timeDateUtils = new TimeDate();


    let validOffers: Offers[] = [];

    offers.forEach(offer => {
      if (offer.category != 3) {
        validOffers.push(offer);
      }
    });

    // Set Min Distances of Merchants
    this.setNearestMerchantOfOffer(validOffers);

    validOffers = validOffers.filter(offer => timeDateUtils.compareDate(new Date(offer.valid_to),
      offerConstants.maxValidCheckinDate, checkinDateString));

    this.getOffersByMinDistanceEachCategory(validOffers);

    validOffers = validOffers.slice(0, 2);
    return validOffers;
  }


  // Create list offers and sorted by min distance for each category 
  public getOffersByMinDistanceEachCategory(validOffers: Offers[]) {
    let minOfferCategory: { [key: number]: Offers } = {};
    for (let offer of validOffers) {
      if (!minOfferCategory[offer.category]) {
        minOfferCategory[offer.category] = offer;
      }
      else if (minOfferCategory[offer.category].nearestMerchant!.distance > offer.nearestMerchant!.distance) {
        minOfferCategory[offer.category] = offer;
      }
    }

    // Sort by Distance
    validOffers.sort((a, b) => a.nearestMerchant!.distance - b.nearestMerchant!.distance);

    // Remove field nearest Merchant to get the final response 
    validOffers = Object.values(minOfferCategory).map(offer => {
      delete offer.nearestMerchant;
      return offer;
    });
  }

  // Private Methods
  private getAPIURL = () => {
    return `https://61c3deadf1af4a0017d990e7.mockapi.io/offers/near_by?lat=1.313492&lon=103.860359&rad=20`;
  };

  // Map Object to Model
  public getOffersReqList = async () => {
    const url = this.getAPIURL();

    return await axios.get(url)
      .then(async (response: any) => {
        let res = response.data.offers;
        if (!res) {
          throw new Error(this.constants.fetchOffersWrongFormat);
        }
        else if (res == null) {
          return this.constants.fetchOffersNoData;
        }
        return res;
      });
  }

  // Add new field nearest merchant with min distance of merchants list
  public setNearestMerchantOfOffer(offers: Offers[]) {
    for (let offer of offers) {
      offer.nearestMerchant = offer.merchants[0];
      for (let merchant of offer.merchants) {
        if (offer.nearestMerchant.distance > merchant.distance) {
          offer.nearestMerchant = merchant;
        }
      }
      offer.merchants = [offer.nearestMerchant];
    }
  }

}

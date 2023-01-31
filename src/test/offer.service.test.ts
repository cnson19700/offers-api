import { OfferService } from './../services'
import { Offers } from './../models';

describe("Filter Function", () => {
    test("it should filter valid offers with checkin date", () => {

        let offerService = new OfferService();
        let offers: Offers[] = [];

        let offer1: Offers = {
            id: 1, title: 'Offer 1', description: 'Offer 1 description',
            category: 1, merchants: [{ id: 1, name: 'Offer1 Merchant1', distance: 0.5 }],
            valid_to: new Date('2020-02-01')
        };

        let offer2: Offers = {
            id: 2, title: 'Offer 2', description: 'Offer 2 description',
            category: 2, merchants: [{ id: 2, name: 'Offer2 Merchant1', distance: 0.6 }],
            valid_to: new Date('2020-03-01')
        };

        let offer4: Offers = {
            id: 4, title: 'Offer 4', description: 'Offer 4 description',
            category: 4, merchants: [{ id: 4, name: 'Offer4 Merchant1', distance: 0.8 }],
            valid_to: new Date('2020-05-01')
        };

        offers = [offer1, offer2, offer4];
        offerService.setNearestMerchantOfOffer(offers);
        offerService.getOffersByMinDistanceEachCategory(offers);
        offers = offers.slice(0, 2);

        expect(offerService.getValidOffers('2020-01-25', offers)).toEqual(offers);
    })
})
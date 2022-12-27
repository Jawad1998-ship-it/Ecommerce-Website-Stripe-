import { loadStripe } from "@stripe/stripe-js";

let stripePromise;


const getStripe = () => {

    if(!stripePromise)
    {
        stripePromise = loadStripe(
            "pk_test_51MIpNJBb6CEzGNAiVIzUmnQtD1hasQ2h8vrogfKVzmRRM3ib0U8BJaxONqxOxuCZS1KB54iNAkCeOPkHb5CTzqBt00TcQlxJw0"
        );
    }

    return stripePromise;

}

export default getStripe;
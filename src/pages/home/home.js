import { useEffect } from 'react';
// COMPONENT
import Product from '../../components/product/Product'
import Slider from '../../components/slider/Slider'

// STYLE
import './home.module.scss'


export default function Home() {
    const url = window.location.href;

    useEffect(() => {
        const scrollToProducts = () => {
        if (url.includes("#product")) {
            window.scrollTo({
            top: '700',
            behavior: "smooth",
            });
            return;
        }
        };
        scrollToProducts();
    }, [url]);


    return (
        <div>
            <Slider />
            <Product />
        </div>
    )
}
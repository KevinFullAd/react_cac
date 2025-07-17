import styled from "styled-components";
import { useCart } from "../contexts/CartContext";

const CARD_HEIGHT = 500;
const IMAGE_HEIGHT = 250;

const Card = styled.div`
    height: ${CARD_HEIGHT}px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid #ddd;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    transition: transform 0.2s ease-in-out;
    background: #fff;

    &:hover {
        transform: scale(1.01);
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
    }
`;

const ImageContainer = styled.div`
    height: ${IMAGE_HEIGHT}px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    padding: 1rem;
    flex-shrink: 0;
`;

const ProductImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
`;

const CardBody = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
`;

const Title = styled.h5`
    font-size: 1.1rem;
    line-height: 1.3;
    height: 2.6rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 0.5rem;
`;

const Description = styled.p`
    font-size: 0.9rem;
    line-height: 1.4;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    color: #666;
    margin-bottom: 0.5rem;
    /* Altura calculada automáticamente: font-size * line-height * número de líneas */
    height: calc(0.9rem * 1.4 * 3);
`;

const Price = styled.p`
    font-size: 1.2rem;
    font-weight: bold;
    color: #2c3e50;
    margin: 0.5rem 0;
`;

const Button = styled.button`
    width: 100%;
    padding: 0.5rem 1rem;
    margin-top: 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;
    border: 1px solid #333;
    color: #333;
    background: transparent;
    border-radius: 6px;
    transition: all 0.2s;

    &:hover {
        background: #333;
        color: white;
    }
`;

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <Card>
            <ImageContainer>
                <ProductImage
                    src={product.image || "https://via.placeholder.com/300"}
                    alt={product.title}
                />
            </ImageContainer>

            <CardBody>
                <div>
                    <Title>{product.title || product.name}</Title>
                    <Description>{product.description || ""}</Description>
                </div>
                <div>
                    <Price>${product.price}</Price>
                    <Button onClick={() => addToCart(product)}>Agregar al carrito</Button>
                </div>
            </CardBody>
        </Card>
    );
};

export default ProductCard;
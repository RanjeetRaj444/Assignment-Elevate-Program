const Card = ({ product }) => {
  return (
    <div
      key={product.id}
      className="card rounded p-4 shadow "
    >
      <img
        className="w-full h-52 object-contain mb-3"
        src={product.image}
        alt={product.title}
      />
      <h2 className="font-semibold text-sm mb-1">{product.title}</h2>
      <p className="text-green-600 font-bold"> Pricec :- ${product.price}</p>
      <p className="text-gray-600">Category :- {product.category}</p>
    </div>
  );
};

export default Card;

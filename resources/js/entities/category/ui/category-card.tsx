import classNames from "classnames";

interface CategoryCardProps {
    name: string;
    imageUrl: string;
    color: string;
    className?: string;
}
export const CategoryCard = (props: CategoryCardProps) => {
    const { name, imageUrl, color } = props;
    return (
        <div style={{ background: color }} className={classNames("flex flex-col",props.className)}>
            <img src={imageUrl} alt={name} className="mb-1 max-w-11" />
            <p className="text-[13px] font-bold text-white mt-auto">{name}</p>
        </div>
    );
};

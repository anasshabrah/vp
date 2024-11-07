import Service from "./Service";
import services from "../data/services.json";
import Shape from "./Shape";

const Services = () => {
    return (
        <section className="service-area relative pb-[100px] lg:pb-[200px]" id="services">
            <div className="container md:grid md:grid-cols-3 lg:gap-7">
                {services.map(service => (
                    <Service
                        key={service.id}
                        desc={service.desc}
                        title={service.title}
                        thumb={`/images/${service.icon}`}
                    />
                ))}
            </div>

            <Shape fillColor="#F9FAFB"/>
        </section>
    );
};

export default Services;

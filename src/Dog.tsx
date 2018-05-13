import * as React from 'react';
import { Card, CardImg, Col } from 'reactstrap';

interface IDogProps {
    url: string;
}

export const Dog: React.SFC<IDogProps> = (props: IDogProps) => {
    const media = props.url.endsWith("mp4") ? (
        <div className="embed-responsive embed-responsive-16by9">
            <video autoPlay={true} loop={true} className="embed-responsive-item">
                <source src={props.url} type="video/mp4" />
            </video>
        </div>
    ) : (
        <Card>
            <CardImg src={props.url} alt={props.url} className="img-responsive" />
        </Card>
    );

    return (
        <Col xs="12" sm="3" md="3">
            {props.url? (media) : (
                <Card>Loading, please wait...</Card>
            )}
        </Col>
    )
}
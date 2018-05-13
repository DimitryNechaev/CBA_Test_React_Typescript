import * as React from 'react';
import { Row } from 'reactstrap';
import { Dog } from './Dog';

interface IDogRowProps {
    urls: string[];
    rowNumber: number;
    dogsInRow: number;
}

export const DogRow: React.SFC<IDogRowProps> = (props: IDogRowProps) => {
    const panes = props.urls.slice(props.rowNumber*props.dogsInRow, (props.rowNumber + 1) * props.dogsInRow);
    while (panes.length < props.dogsInRow) {
         panes.push("");
    }

    return (
        <Row style={{marginBottom: 1 + 'em'}}>
          {panes.map((url, idx) => {
              return (
                <Dog key={props.rowNumber*10 + idx} url={url}/>
              )
            })}
        </Row>
    )
}
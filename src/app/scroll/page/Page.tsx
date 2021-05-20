import React, { CSSProperties } from 'react';
import './Page.scss';

export interface PageProps {
  children?: any
}
interface PageState {
  children?: any
  translate: number
  isMoved: boolean
}

class Page extends React.Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);
    this.state = { isMoved: false, translate: 0 };
  }
  render() {
    return (
      <div className="Page"
        style={{ '--verticalTranslate': this.state.translate } as CSSProperties}
        onPointerUp={this.endMove.bind(this)}
        onPointerDown={this.startMove.bind(this)}

        onPointerMove={this.state.isMoved ? this.move.bind(this) : undefined}
      >
        {this.props.children}
      </div>
    );
  }
  // values
  // methods
  protected move(ev: React.PointerEvent<HTMLDivElement>) {
    const translate = this.state.translate + ev.movementY
    this.setState({ translate })
  }
  protected startMove(ev: React.PointerEvent<HTMLDivElement>) {
    this.setState({ isMoved: true })
  }
  protected endMove(ev: React.PointerEvent<HTMLDivElement>) {
    this.setState({ isMoved: false })
  }
}


export default Page;

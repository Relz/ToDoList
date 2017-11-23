import * as React from 'react';

export interface IReferable {
	onRef?(ref: React.Component | undefined): void;
}

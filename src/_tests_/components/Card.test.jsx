import { render, screen } from '@testing-library/react';
import Card from '../../components/Card';

describe('Card Component', () => {
  test('renders title and children correctly', () => {
    render(
      <Card title='Test Title'>
        <div>Test Content</div>
      </Card>,
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});

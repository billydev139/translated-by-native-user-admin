import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Breadcrumb = ({ pageName }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 px-1 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-[#464E5F]">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/">
              Dashboard /
            </Link>
          </li>
          <li className="font-medium text-[#464E5F]">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

Breadcrumb.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default Breadcrumb;

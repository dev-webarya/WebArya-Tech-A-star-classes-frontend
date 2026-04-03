import React, { useState } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface TutorCardProps {
    name: string;
    subject: string;
    specialty: string;
    image: string;
    bio: string;
}

const TutorCard: React.FC<TutorCardProps> = ({ name, subject, specialty, image, bio }) => {
    const [zoom, setZoom] = useState(1);

    const handleZoom = (direction: 'in' | 'out') => {
        if (direction === 'in' && zoom < 2) {
            setZoom(zoom + 0.2);
        } else if (direction === 'out' && zoom > 1) {
            setZoom(zoom - 0.2);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Image Container with Zoom Controls */}
            <div className="relative bg-gray-100 h-64 overflow-hidden flex items-center justify-center">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-contain object-center transition-transform duration-300"
                    style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
                />

                {/* Zoom Controls */}
                <div className="absolute bottom-3 right-3 bg-white rounded-lg shadow-md flex gap-2">
                    <button
                        onClick={() => handleZoom('in')}
                        disabled={zoom >= 2}
                        className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title="Zoom In"
                    >
                        <ZoomIn className="h-5 w-5 text-blue-600" />
                    </button>
                    <button
                        onClick={() => handleZoom('out')}
                        disabled={zoom <= 1}
                        className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title="Zoom Out"
                    >
                        <ZoomOut className="h-5 w-5 text-blue-600" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
                <p className="text-blue-600 font-semibold mb-2">{subject}</p>
                <p className="text-sm text-gray-600 mb-3">{specialty}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{bio}</p>
            </div>
        </div>
    );
};

export default TutorCard;
